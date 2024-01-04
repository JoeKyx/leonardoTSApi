import { z } from 'zod'
import { GenerateImageResponse } from './responseTypes'
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

export const SdGenerationJobSchema = z.object({
  generationId: z.string(),
  apiCreditCost: z.number(),
})

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

export const UpscaleImageResponseSchema = z.union([
  z.object({
    success: z.literal(true),
    upscaleResult: z.object({
      url: z.string(),
      id: z.string(),
    }),
  }),
  z.object({
    success: z.literal(false),
    error: z.string(),
  }),
])

export type UpscaleImageResponse = z.infer<typeof UpscaleImageResponseSchema>

export type GenerationResultResponse = {
  generations_by_pk: GenerateImageResponse | null | undefined
}

export type GenerateImagesResponse =
  | {
      success: true
      generationResult: GenerateImageResponse
    }
  | {
      success: false
      error: string
    }

export type ImageExtension = 'jpg' | 'png' | 'jpeg' | 'webp'

export const uploadInitImageFromUrlResponseSchema = z.union([
  z.object({
    success: z.literal(true),
    uploadInitImageId: z.string(),
    url: z.string(),
  }),
  z.object({
    success: z.literal(false),
    error: z.string(),
  }),
])

export type UploadInitImageFromUrlResponse = z.infer<
  typeof uploadInitImageFromUrlResponseSchema
>
