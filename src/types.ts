import { z } from 'zod'
import {
  ImageExtensionSchema,
  UpscaleImageResponseSchema,
  uploadInitImageFromUrlResponseSchema,
  webhookImageGenerationResponseSchema,
  webhookPostProcessingResponseSchema,
  webhookResponseSchema,
  webhookVideoGenerationResponseSchema,
} from './schemas'

export const InvalidValidationResultSchema = z.object({
  valid: z.literal(false),
  errors: z.array(z.string()),
})

export const ValidValidationResultSchema = z.object({
  valid: z.literal(true),
})

export const ValidationResultSchema = z.union([
  InvalidValidationResultSchema,
  ValidValidationResultSchema,
])

export type AnimateImageParams = {
  motionStrength?: number
  isVariation?: boolean
  isInitImage?: boolean
}

export type ValidValidationResult = z.infer<typeof ValidValidationResultSchema>

export type InvalidValidationResult = z.infer<
  typeof InvalidValidationResultSchema
>

export type ValidationResult = z.infer<typeof ValidationResultSchema>

export const ApiErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
})

export type APIError = z.infer<typeof ApiErrorSchema>

export const ImageUploadInitResponseSchema = z.object({
  uploadInitImage: z.object({
    id: z.string(),
    fields: z.string(),
    key: z.string(),
    url: z.string(),
    __typename: z.string(),
  }),
})

export type ImageUploadInitResponse = z.infer<
  typeof ImageUploadInitResponseSchema
>

export const SdGenerationJobSchema = z.union([
  z.object({
    motionSvdGenerationJob: z.object({
      generationId: z.string(),
      apiCreditCost: z.number(),
    }),
  }),
  ApiErrorSchema,
])

export const GenerationJobResponseSchema = z.union([
  z.object({
    sdGenerationJob: z.object({
      generationId: z.string(),
      apiCreditCost: z.number(),
    }),
  }),
  ApiErrorSchema,
])

export type GenerationJobResponse = z.infer<typeof GenerationJobResponseSchema>

export type SVDGenerationJobResponse = z.infer<typeof SdGenerationJobSchema>

export const UpscaleJobResponseSchema = z.union([
  z.object({
    sdUpscaleJob: z.object({
      id: z.string(),
      apiCreditCost: z.number(),
    }),
  }),
  ApiErrorSchema,
])

export type UpscaleJobResponse = z.infer<typeof UpscaleJobResponseSchema>

export const VariationResultResponseSchema = z.object({
  generated_image_variation_generic: z.array(
    z.object({
      url: z.string(),
      status: z.string(),
      id: z.string(),
      createdAt: z.string(),
      transformType: z.union([z.literal('UPSCALE'), z.literal('UNZOOM')]),
    })
  ),
})

export type VariationResultResponse = z.infer<
  typeof VariationResultResponseSchema
>

export type UpscaleImageResponse = z.infer<typeof UpscaleImageResponseSchema>

export type AnimateImageResponse =
  | {
      success: true
      result: {
        id: string
        url: string
      }
    }
  | {
      success: false
      message: string
    }

export type GenerationResultImage = {
  motionMP4URL: string | null
  id: string
  url: string
}

export type VideoGenerationResultImage = {
  motionMP4URL: string
  id: string
}

export type SuccessfulGenerationResult = {
  success: true
  result: {
    prompt: string
    generationId: string
    images: GenerationResultImage[]
  }
}

export type SuccessfulVideoGenerationResult = {
  success: true
  result: {
    generationId: string
    video: VideoGenerationResultImage
  }
}

export type SuccessfulWaitingForGenerationResult = {
  success: true
  result: {
    url: string
  }
}

export type ImageExtension = z.infer<typeof ImageExtensionSchema>

export type UploadInitImageFromUrlResponse = z.infer<
  typeof uploadInitImageFromUrlResponseSchema
>

export type WebhookPostProcessingResultObject = z.infer<
  typeof webhookPostProcessingResponseSchema
>['data']['object']

export type WebhookGenerationResultObject = z.infer<
  typeof webhookImageGenerationResponseSchema
>['data']['object']

export type WebhookVideoGenerationResultObject = z.infer<
  typeof webhookVideoGenerationResponseSchema
>['data']['object']

export type SuccessfulVariationResult = {
  success: true
  result: {
    method: 'UPSCALE' | 'UNZOOM'
    originalImageId: string
    url: string
    variationId: string
  }
}

export type FailedResult = {
  success: false
  message: string
}

export type VariationResult = SuccessfulVariationResult | FailedResult
export type WebhookResponse = z.infer<typeof webhookResponseSchema>

export type GenerationResult = SuccessfulGenerationResult | FailedResult

export type VideoGenerationResult =
  | SuccessfulVideoGenerationResult
  | FailedResult

export type BasicGenerationResult =
  | { success: true; generationId: string }
  | FailedResult

export type WaitingForGenerationResult =
  | SuccessfulWaitingForGenerationResult
  | FailedResult

type ResultWithoutOriginalImageId = Omit<
  SuccessfulVariationResult['result'],
  'originalImageId'
>

export type SuccessfulVariationResultWithoutOriginalImageId = Omit<
  SuccessfulVariationResult,
  'result'
> & {
  result: ResultWithoutOriginalImageId
}

export type PollingVariationResult =
  | SuccessfulVariationResultWithoutOriginalImageId
  | FailedResult
