import { z } from 'zod'
import {
  ValidValidationResultSchema,
  InvalidValidationResultSchema,
  ValidationResultSchema,
  ApiErrorSchema,
  GenerateImageResponseSchema,
  GeneratedImageSchema,
  GenerationJobResponseSchema,
  ImageUploadInitResponseSchema,
  UpscaleImageResponseSchema,
  UpscaleJobResponseSchema,
  VariationResultResponseSchema,
  uploadInitImageFromUrlResponseSchema,
  webhookImageGenerationResponseSchema,
  webhookImageSchema,
  webhookPostProcessingResponseSchema,
  webhookResponseSchema,
} from './schemas.js'

export type ValidValidationResult = z.infer<typeof ValidValidationResultSchema>

export type InvalidValidationResult = z.infer<
  typeof InvalidValidationResultSchema
>

export type ValidationResult = z.infer<typeof ValidationResultSchema>

export type APIError = z.infer<typeof ApiErrorSchema>

export type ImageUploadInitResponse = z.infer<
  typeof ImageUploadInitResponseSchema
>

export type GenerationJobResponse = z.infer<typeof GenerationJobResponseSchema>

export type UpscaleJobResponse = z.infer<typeof UpscaleJobResponseSchema>

export type VariationResultResponse = z.infer<
  typeof VariationResultResponseSchema
>

export type UpscaleImageResponse = z.infer<typeof UpscaleImageResponseSchema>

export type GenerateImagesResponse = GenerationResult

export type ImageExtension = 'jpg' | 'png' | 'jpeg' | 'webp'

export type UploadInitImageFromUrlResponse = z.infer<
  typeof uploadInitImageFromUrlResponseSchema
>

export type GenerateImageResponse = z.infer<typeof GenerateImageResponseSchema>

export type GeneratedImage = z.infer<typeof GeneratedImageSchema>

//87defef5-3e35-4ea6-b5bb-bebbce4e6df3

export type WebhookImageGenerationResponse = z.infer<
  typeof webhookImageGenerationResponseSchema
>

export type ResponseImage = z.infer<typeof webhookImageSchema>

export type WebhookGenerationResultObject = z.infer<
  typeof webhookImageGenerationResponseSchema
>['data']['object']

export type WebhookPostProcessingResultObject = z.infer<
  typeof webhookPostProcessingResponseSchema
>['data']['object']

export type GenerationResult =
  | { success: false; message: string }
  | {
      success: true
      result: {
        prompt: string
        generationId: string
        images: {
          id: string
          url: string
        }[]
      }
    }

type GenerationResulResult = z.infer<
  typeof webhookImageGenerationResponseSchema
>

export type VariationResult =
  | { success: false; message: string }
  | {
      success: true
      result: {
        originalImageId: string
        url: string
        variationId: string
        method: 'UPSCALE' | 'UNZOOM'
      }
    }

export type WebhookResponse = z.infer<typeof webhookResponseSchema>
