import { GenerateImageQueryParams } from './queryParamTypes'
import { GenerateImageResponse } from './responseTypes'
import {
  ValidationError,
  validateGenerateImageQueryParams,
} from './validators.js'
import fetch from 'node-fetch'

type GenerationJobResponse = {
  sdGenerationJob: {
    generationId: string
    apiCreditCost: number
  }
}

type GenerationResultResponse = {
  generations_by_pk: GenerateImageResponse
}

export class LeonardoAPI {
  private apiKey: string
  private baseUrl: string = 'https://cloud.leonardo.ai/api/rest/v1'
  private generationTimeout: number

  constructor(apiKey: string, generationTimeout = 120000) {
    this.apiKey = apiKey
    this.generationTimeout = generationTimeout
  }

  public async generateImages(params: GenerateImageQueryParams) {
    const validation = validateGenerateImageQueryParams(params)
    if (!validation.valid) {
      throw new ValidationError(validation.errors.join('\n'))
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
      console.log(generationJobResponse)
      const generationId = generationJobResponse.sdGenerationJob.generationId
      const genResult = await this.waitForGenerationResult(generationId)
      return genResult
    } catch (error) {
      return {
        success: false,
        error,
      }
    }
  }
  private async waitForGenerationResult(generationId: string) {
    const generationResultUrl = `${this.baseUrl}/generations/${generationId}`
    let generationResult: GenerationResultResponse
    const startTime = Date.now()

    do {
      const generationResultResponse = await fetch(generationResultUrl, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${this.apiKey}`,
        },
      })
      generationResult =
        (await generationResultResponse.json()) as GenerationResultResponse
      console.log('Generation result:', generationResult)
      if (generationResult.generations_by_pk.status === 'PENDING') {
        // Wait for 1 second before next check
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Check if 2 minutes have elapsed
        if (Date.now() - startTime > this.generationTimeout) {
          console.log('Generation result timeout.')
          return {
            success: false,
            generationResult: generationResult.generations_by_pk,
          }
        }
      }
    } while (generationResult.generations_by_pk.status === 'PENDING')

    console.log('Generation complete:', generationResult)
    return {
      success: true,
      generationResult: generationResult.generations_by_pk,
    }
  }
}
