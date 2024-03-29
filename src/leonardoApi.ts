import FormData from 'form-data'
import fs from 'fs'
import fetch from 'node-fetch'
import path from 'path'
import {
  AnimateImageParams,
  AnimateImageResponse,
  BasicGenerationResult,
  GenerationJobResponse,
  GenerationResult,
  ImageExtension,
  ImageUploadInitResponse,
  PollingVariationResult,
  SVDGenerationJobResponse,
  UploadInitImageFromUrlResponse,
  UpscaleImageResponse,
  UpscaleJobResponse,
  VideoGenerationResult,
  WebhookGenerationResultObject,
  WebhookPostProcessingResultObject,
  WebhookVideoGenerationResultObject,
} from './types'
import { getErrorMessage, saveFileTemporarily } from './utils'

import axios from 'axios'
import { default as e, default as express } from 'express'

import { EventEmitter } from 'events'
import {
  GenerateImageQueryParams,
  GenerateImageQueryParamsSchema,
} from './queryParamTypes'
import {
  GenerationJobResponseSchema,
  ImageExtensionSchema,
  SVDMotionGenerationJobSchema,
  pollingImageGenerationResponseSchema,
  pollingVariantImageResponseSchema,
  webhookResponseSchema,
} from './schemas'

class GenerationEventEmitter extends EventEmitter {}
const generationEventEmitter = new GenerationEventEmitter()

class UpscaleEventEmitter extends EventEmitter {}
const upscaleEventEmitter = new UpscaleEventEmitter()

export default class LeonardoAPI {
  private apiKey: string
  private baseUrl: string = 'https://cloud.leonardo.ai/api/rest/v1'
  private baseCDNUrl: string = 'https://cdn.leonardo.ai/'
  private generationTimeout: number
  private webhookApiKey: string | undefined
  private useWebhook: boolean = false

  constructor(
    apiKey: string,
    useWebhook = false,
    generationTimeout = 120000,
    webhookApiKey?: string,
    port?: number
  ) {
    this.apiKey = apiKey
    this.generationTimeout = generationTimeout

    this.webhookApiKey = webhookApiKey
    this.useWebhook = useWebhook

    if (useWebhook) {
      const portToUse = port || 3050
      console.log('Port: ' + portToUse)
      const app = express()
      app.use(express.json())
      app.use(express.urlencoded({ extended: true }))
      app.get('/webhook-endpoint', (req, res) => {
        res.send('Leonardo API')
      })
      app.post('/webhook-endpoint', this.webhookHandler)
      app.get('/', (req, res) => {
        res.send('Leonardo API')
      })
      app.listen(portToUse, () => {
        console.log('Server running on port ' + portToUse)
      })
    }
  }

  public close() {
    if (this.useWebhook) {
      console.log('Closing webhook server')
      process.exit(0)
    }
  }

  public async generateImagesBase(
    params: GenerateImageQueryParams
  ): Promise<BasicGenerationResult> {
    try {
      GenerateImageQueryParamsSchema.parse(params)
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }

    const startJobUrl = `${this.baseUrl}/generations`
    const response = await fetch(startJobUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(params),
    })

    const generationJobResponse =
      (await response.json()) as GenerationJobResponse

    try {
      GenerationJobResponseSchema.parse(generationJobResponse)
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }

    if ('error' in generationJobResponse)
      return { success: false, message: generationJobResponse.error }
    return {
      success: true,
      generationId: generationJobResponse.sdGenerationJob.generationId,
    }
  }

  public async generateImages(
    params: GenerateImageQueryParams
  ): Promise<GenerationResult> {
    try {
      const base = await this.generateImagesBase(params)
      if (!base.success) return base

      const genResult = await this.waitForGenerationResult(base.generationId)
      return genResult
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  }

  public async animateImageBase(
    imageId: string,
    params?: AnimateImageParams
  ): Promise<BasicGenerationResult> {
    const animateUrl = `${this.baseUrl}/generations-motion-svd`
    const response = await fetch(animateUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        imageId: imageId,
        ...params,
      }),
    })

    console.log(response)

    const generationJobResponse =
      (await response.json()) as SVDGenerationJobResponse

    try {
      SVDMotionGenerationJobSchema.parse(generationJobResponse)
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }

    if ('error' in generationJobResponse)
      return { success: false, message: 'Unknown error' }

    const generationId =
      generationJobResponse.motionSvdGenerationJob.generationId
    return { success: true, generationId: generationId }
  }

  public async animateImage(
    imageId: string,
    params?: AnimateImageParams
  ): Promise<AnimateImageResponse> {
    try {
      const basicSteps = await this.animateImageBase(imageId, params)
      if (!basicSteps.success) return basicSteps
      const genResult = await this.waitForVideoGenerationResult(
        basicSteps.generationId
      )
      if (genResult.success) {
        if (!genResult.result.video.motionMP4URL) {
          return {
            success: false,
            message: 'No motionMP4URL in result',
          }
        }
        return {
          success: true,
          result: {
            id: genResult.result.generationId,
            url: genResult.result.video.motionMP4URL,
          },
        }
      } else {
        return {
          success: false,
          message: genResult.message || 'Unknown error',
        }
      }
    } catch (error) {
      return {
        success: false,
        message: getErrorMessage(error),
      }
    }
  }

  public async upscaleImage(imageId: string): Promise<UpscaleImageResponse> {
    const upscaleUrl = `${this.baseUrl}/variations/upscale`
    const response = await fetch(upscaleUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        id: imageId,
      }),
    })
    const upscaleJobResponse = (await response.json()) as UpscaleJobResponse

    if ('error' in upscaleJobResponse) {
      return {
        success: false,
        error: upscaleJobResponse.error,
      }
    }

    const upscaleId = upscaleJobResponse.sdUpscaleJob.id
    const upscaleResult = await this.waitForVariationResult(upscaleId)
    if (upscaleResult && upscaleResult.success) {
      return {
        success: true,
        upscaleResult: {
          url: upscaleResult.result.url,
          id: upscaleResult.result.variationId,
        },
      }
    } else {
      return {
        success: false,
        error: upscaleResult.message,
      }
    }
  }

  public uploadInitImageFromUrl = async (
    url: string,
    fileExtension: ImageExtension
  ): Promise<UploadInitImageFromUrlResponse> => {
    // init image upload
    const initUploadResponse = await this.initUploadImage(fileExtension)
    // upload image
    try {
      const uploadResponse = await this.uploadImageFromUrl(
        url,
        fileExtension,
        initUploadResponse
      )
      return {
        success: true,
        uploadInitImageId: initUploadResponse.uploadInitImage.id,
        url: this.baseCDNUrl + initUploadResponse.uploadInitImage.key,
      }
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      }
    }
  }

  public uploadInitImageFromBuffer = async (
    buffer: Buffer,
    filename: string
  ): Promise<UploadInitImageFromUrlResponse> => {
    // init image upload
    const fileExtension = ImageExtensionSchema.safeParse(
      filename.split('.').pop()
    )
    if (!fileExtension.success) {
      return {
        success: false,
        error: 'Invalid file extension',
      }
    }

    const initUploadResponse = await this.initUploadImage(fileExtension.data)
    console.log(initUploadResponse)
    // upload image
    try {
      const uploadResponse = await this.uploadImageFile(
        buffer,
        filename,
        initUploadResponse
      )
      return {
        success: true,
        uploadInitImageId: initUploadResponse.uploadInitImage.id,
        url: this.baseCDNUrl + initUploadResponse.uploadInitImage.key,
      }
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error),
      }
    }
  }

  private async initUploadImage(fileExtension: ImageExtension) {
    // init image upload
    const initUploadUrl = `${this.baseUrl}/init-image`
    const response = await fetch(initUploadUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.apiKey}`,
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        extension: fileExtension,
      }),
    })

    console.log('Response:', response)

    const initUploadResponse =
      (await response.json()) as ImageUploadInitResponse
    return initUploadResponse
  }

  private async uploadImageFromUrl(
    url: string,
    fileExtension: ImageExtension,
    initUploadResponse: ImageUploadInitResponse
  ) {
    // TODO: remove temp saving of file

    const filePath = await saveFileTemporarily(url, fileExtension)
    // const file = fs.createReadStream(filePath)

    const fields = JSON.parse(initUploadResponse.uploadInitImage.fields)
    let parsedFields = fields
    if (typeof fields === 'string') {
      parsedFields = JSON.parse(fields)
    } else if (!(fields instanceof Object)) {
      throw new Error('Fields must be a JSON string or an object')
    }
    let form = new FormData()
    Object.entries(parsedFields).forEach(([key, value]) => {
      form.append(key, value as string)
    })
    form.append('file', fs.createReadStream(path.resolve(filePath)))

    try {
      const uploadUrl = initUploadResponse.uploadInitImage.url
      const uploadResponse = await axios.post(uploadUrl, form)

      if (uploadResponse.status >= 300) {
        throw new Error('Upload failed with status: ' + uploadResponse.status)
      }

      return uploadResponse
    } catch (error) {
      console.error('Error during file upload:', error)
      throw error
    } finally {
      fs.unlinkSync(filePath)
    }
  }
  private async uploadImageFile(
    buffer: Buffer,
    filename: string,
    initUploadResponse: ImageUploadInitResponse
  ) {
    const fields = JSON.parse(initUploadResponse.uploadInitImage.fields)
    let parsedFields = fields
    if (typeof fields === 'string') {
      parsedFields = JSON.parse(fields)
    } else if (!(fields instanceof Object)) {
      throw new Error('Fields must be a JSON string or an object')
    }
    let form = new FormData()
    Object.entries(parsedFields).forEach(([key, value]) => {
      form.append(key, value as string)
    })
    form.append('file', buffer, filename)

    try {
      const uploadUrl = initUploadResponse.uploadInitImage.url
      const uploadResponse = await axios.post(uploadUrl, form, {
        headers: form.getHeaders(),
      })

      if (uploadResponse.status >= 300) {
        throw new Error('Upload failed with status: ' + uploadResponse.status)
      }

      return uploadResponse
    } catch (error) {
      console.error('Error during file upload:', error)
      throw error
    }
  }
  private async waitForVariationResult(
    variationId: string
  ): Promise<PollingVariationResult> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject({
          success: false,
          message: 'Upscale timeout',
        })
      }, this.generationTimeout)
      if (!this.useWebhook || !this.webhookApiKey) {
        this.pollVariationResult(variationId, resolve, reject, timeout)
      } else {
        upscaleEventEmitter.once(
          `upscale-complete-${variationId}`,
          (variationResult: WebhookPostProcessingResultObject) => {
            clearTimeout(timeout)
            resolve({
              success: true,
              result: {
                method: variationResult.transformType,
                url: variationResult.url,
                variationId: variationResult.id,
              },
            })
          }
        )
      }
    })
  }

  private async waitForVideoGenerationResult(
    generationId: string
  ): Promise<VideoGenerationResult> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject({
          success: false,
          message: 'Generation timeout',
        })
      }, this.generationTimeout)
      if (!this.useWebhook || !this.webhookApiKey) {
        const resolveToVideo = (generationResult: GenerationResult) => {
          clearTimeout(timeout)
          if (!generationResult.success) {
            reject(generationResult)
            return
          }
          if (!generationResult.result.images[0].motionMP4URL) {
            reject({
              success: false,
              message: 'No motionMP4URL in result',
            })
            return
          }
          resolve({
            success: true,
            result: {
              generationId: generationResult.result.generationId,
              video: {
                id: generationResult.result.images[0].id,
                motionMP4URL: generationResult.result.images[0].motionMP4URL,
              },
            },
          })
        }

        this.pollGenerationResult(generationId, resolveToVideo, reject, timeout)
      } else {
        generationEventEmitter.once(
          `generation-complete-${generationId}`,
          (generationResult: WebhookVideoGenerationResultObject) => {
            clearTimeout(timeout)
            if (!generationResult.images[0].motionMP4URL) {
              reject({
                success: false,
                message: 'No motionMP4URL in result',
              })
            }
            resolve({
              success: true,
              result: {
                generationId: generationResult.id,
                video: {
                  id: generationResult.images[0].id,
                  motionMP4URL: generationResult.images[0].motionMP4URL,
                },
              },
            })
          }
        )
      }
    })
  }

  private async waitForGenerationResult(
    generationId: string
  ): Promise<GenerationResult> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject({
          success: false,
          message: 'Generation timeout',
        })
      }, this.generationTimeout)
      if (!this.useWebhook || !this.webhookApiKey) {
        this.pollGenerationResult(generationId, resolve, reject, timeout)
      } else {
        generationEventEmitter.once(
          `generation-complete-${generationId}`,
          (generationResult: WebhookGenerationResultObject) => {
            clearTimeout(timeout)
            resolve({
              success: true,
              result: {
                prompt: generationResult.prompt,
                generationId: generationResult.id,
                images: generationResult.images.map((image) => ({
                  id: image.id,
                  url: image.url,
                  motionMP4URL: image.motionMP4URL,
                })),
              },
            })
          }
        )
      }
    })
  }

  private async pollVariationResult(
    variationId: string,
    resolve: (value: PollingVariationResult) => void,
    reject: (reason?: any) => void,
    timeout: NodeJS.Timeout
  ) {
    const variationResult = await this.getVariationResult(variationId)
    if (variationResult.success) {
      clearTimeout(timeout)
      resolve(variationResult)
    } else if (variationResult.message == 'PENDING') {
      setTimeout(() => {
        this.pollVariationResult(variationId, resolve, reject, timeout)
      }, 1000)
    } else {
      clearTimeout(timeout)
      reject(variationResult)
    }
  }

  private async getVariationResult(
    variationId: string
  ): Promise<PollingVariationResult> {
    const variationResultUrl = `${this.baseUrl}/variations/${variationId}`
    const response = await fetch(variationResultUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.apiKey}`,
      },
    })
    const variationResultJson = await response.json()
    const pollingImageResponse =
      pollingVariantImageResponseSchema.safeParse(variationResultJson)
    if (
      pollingImageResponse.success &&
      pollingImageResponse.data.generated_image_variation_generic.length > 0
    ) {
      const variationResult =
        pollingImageResponse.data.generated_image_variation_generic[0]
      if (variationResult.status == 'COMPLETE') {
        return {
          success: true,
          result: {
            method: variationResult.transformType,
            url: variationResult.url,
            variationId: variationResult.id,
          },
        }
      } else if (variationResult.status == 'PENDING') {
        return {
          success: false,
          message: variationResult.status,
        }
      } else {
        return {
          success: false,
          message: 'variation failed (Code 1)',
        }
      }
    } else if (!pollingImageResponse.success) {
      console.log(pollingImageResponse.error)
      return {
        success: false,
        message: 'variation failed (Code 0)',
      }
    } else {
      return {
        success: false,
        message: 'variation failed (Code 2)',
      }
    }
  }

  private async pollGenerationResult(
    generationId: string,
    resolve: (value: GenerationResult) => void,
    reject: (reason?: any) => void,
    timeout: NodeJS.Timeout
  ) {
    const generationResult = await this.getGenerationResult(generationId)
    if (generationResult.success) {
      clearTimeout(timeout)
      resolve(generationResult)
    } else if (generationResult.message == 'PENDING') {
      setTimeout(() => {
        this.pollGenerationResult(generationId, resolve, reject, timeout)
      }, 1000)
    } else {
      clearTimeout(timeout)
      reject(generationResult)
    }
  }

  public async getGenerationResult(
    generationId: string
  ): Promise<GenerationResult> {
    const generationResultUrl = `${this.baseUrl}/generations/${generationId}`
    const response = await fetch(generationResultUrl, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        authorization: `Bearer ${this.apiKey}`,
      },
    })
    const generationResultJson = await response.json()

    const pollingImageResponse =
      pollingImageGenerationResponseSchema.safeParse(generationResultJson)
    if (pollingImageResponse.success) {
      const generationResult = pollingImageResponse.data.generations_by_pk
      if (generationResult.status == 'COMPLETE') {
        return {
          success: true,
          result: {
            prompt: generationResult.prompt,
            generationId: generationResult.id,
            images: generationResult.generated_images.map((image) => ({
              id: image.id,
              url: image.url,
              motionMP4URL: image.motionMP4URL,
            })),
          },
        }
      } else if (generationResult.status == 'PENDING') {
        return {
          success: false,
          message: generationResult.status,
        }
      } else {
        return {
          success: false,
          message: 'generation failed (Code 1)',
        }
      }
    } else {
      console.log(pollingImageResponse.error)
      // TODO: Implement a better error handling
      return {
        success: false,
        message: 'PENDING',
      }
    }
  }

  private webhookHandler = async (req: e.Request, res: e.Response) => {
    const generationResultResponse = webhookResponseSchema.parse(req.body)

    // Check api key
    if (this.webhookApiKey) {
      if (
        generationResultResponse.data.object.apiKey.webhookCallbackApiKey ==
        this.webhookApiKey
      ) {
      } else {
        throw new Error('Invalid api key')
      }
    }
    try {
      if (generationResultResponse.type == 'image_generation.complete') {
        generationEventEmitter.emit(
          `generation-complete-${generationResultResponse.data.object.id}`,
          generationResultResponse.data.object
        )
      }
      if (generationResultResponse.type == 'video_generation.complete') {
        generationEventEmitter.emit(
          `generation-complete-${generationResultResponse.data.object.id}`,
          generationResultResponse.data.object
        )
      }
      if (
        generationResultResponse.type == 'post_processing.completed' ||
        generationResultResponse.type == 'post_processing.complete'
      ) {
        upscaleEventEmitter.emit(
          `upscale-complete-${generationResultResponse.data.object.id}`,
          generationResultResponse.data.object
        )
      }
    } catch (error) {
      console.log('ERROR')
      console.log(getErrorMessage(error))
      return {
        success: false,
        error: getErrorMessage(error),
      }
    }
  }
}

//  TODO:  convert response to right format

export * from './queryParamTypes'
export * from './types'
export * from './validators'
