import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import LeonardoAPI, { GenerateImageQueryParams } from '../src/leonardoApi'
dotenv.config()

async function testImageGenerationAndUpscaling(
  api: LeonardoAPI,
  params: GenerateImageQueryParams
) {
  const result = await api.generateImages(params)
  expect(result.success).toBe(true)
  if (!result.success || result.result.images.length === 0) {
    throw new Error('Image generation failed or no images were generated')
  }
  expect(result.result.images.length).toBe(2)
  expect(result.result.images[0].id).toBeDefined()
  expect(result.result.images[0].url).toBeDefined()
  expect(result.result.prompt).toBe(params.prompt)
  expect(result.result.generationId).toBeDefined()

  const generateImageId = result.result.images[0].id
  const upscaleResult = await api.upscaleImage(generateImageId)
  expect(upscaleResult.success).toBe(true)
  if (!upscaleResult.success) {
    throw new Error('Upscaling failed')
  }
  expect(upscaleResult.upscaleResult.id).toBeDefined()
  expect(upscaleResult.upscaleResult.url).toBeDefined()
}

describe('LeonardoAPI', () => {
  if (!process.env.LEONARDO_API_KEY)
    throw new Error('Missing LEONARDO_API_KEY environment variable')

  describe('Polling', () => {
    let api: LeonardoAPI

    beforeAll(() => {
      if (!process.env.LEONARDO_API_KEY)
        throw new Error('Missing LEONARDO_API_KEY environment variable')
      api = new LeonardoAPI(process.env.LEONARDO_API_KEY) // Polling instance
    })

    describe('Image Generation and Upscaling', () => {
      it('should generate images and upscale one of them', async () => {
        const params: GenerateImageQueryParams = {
          prompt: 'A painting of a cat working on a computer',
          num_images: 2,
        }
        await testImageGenerationAndUpscaling(api, params)
      }, 60000)
    })
  })

  describe('Webhooks', () => {
    let api: LeonardoAPI

    beforeAll(() => {
      if (!process.env.LEONARDO_API_KEY || !process.env.LEO_WEBHOOK_API_KEY)
        throw new Error('Missing LEONARDO_API_KEY environment variable')
      api = new LeonardoAPI(
        process.env.LEONARDO_API_KEY,
        true,
        undefined,
        process.env.LEO_WEBHOOK_API_KEY,
        8080
      ) // Webhook instance
    })

    describe('Image Generation and Upscaling', () => {
      it('should generate images and upscale one of them', async () => {
        const params: GenerateImageQueryParams = {
          prompt: 'A painting of a cat working on a computer',
          num_images: 2,
        }
        await testImageGenerationAndUpscaling(api, params)
      }, 60000)
    })

    afterAll(() => {
      api.close()
    })
  })

  describe('Upload Image', () => {
    let api: LeonardoAPI

    beforeAll(() => {
      if (!process.env.LEONARDO_API_KEY)
        throw new Error('Missing LEONARDO_API_KEY environment variable')
      api = new LeonardoAPI(process.env.LEONARDO_API_KEY) // Polling instance
    })

    it.only('should upload an image', async () => {
      console.log(process.cwd())
      const filePath = path.resolve(process.cwd(), 'tests/mock.png')
      const buffer = fs.readFileSync(filePath)

      const response = await api.uploadInitImageFromBuffer(buffer, 'mock.png')

      console.log(response)

      expect(response.success).toBe(true)
      if (!response.success) {
        throw new Error('Upload failed')
      }
      expect(response.url).toBeDefined()
      console.log(response.url)
      // ... additional assertions ...
    }, 10000)
  })
})
