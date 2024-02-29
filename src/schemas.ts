import { z } from 'zod'
import {
  PresetStyleAlchemySchema,
  PresetStyleDefaultSchema,
  PresetStylePhotoRealSchema,
  SchedulerSchema,
  StableDiffusionVersionSchema,
} from './queryParamTypes'

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

export const ApiErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
})

export const ImageExtensionSchema = z.union([
  z.literal('jpg'),
  z.literal('jpeg'),
  z.literal('png'),
  z.literal('webp'),
])

export const ImageUploadInitResponseSchema = z.object({
  uploadInitImage: z.object({
    id: z.string(),
    fields: z.string(),
    key: z.string(),
    url: z.string(),
    __typename: z.string(),
  }),
})

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

export const UpscaleJobResponseSchema = z.union([
  z.object({
    sdUpscaleJob: z.object({
      id: z.string(),
      apiCreditCost: z.number(),
    }),
  }),
  ApiErrorSchema,
])

export const SVDMotionGenerationJobSchema = z.union([
  z.object({
    motionSvdGenerationJob: z.object({
      generationId: z.string(),
      apiCreditCost: z.number(),
    }),
  }),
  ApiErrorSchema,
])

export const GeneratedImageSchema = z.object({
  url: z.string(),
  nsfw: z.boolean(),
  id: z.string(),
  likeCount: z.number(),
  motionMP4URL: z.string().nullable(),
  generated_image_variation_generics: z.array(z.string()),
})

export const GenerateImageResponseSchema = z.object({
  id: z.string(),
  generated_images: z.array(GeneratedImageSchema),
  modelId: z.string().nullable(),
  prompt: z.string(),
  negativePrompt: z.string().nullable(),
  imageHeight: z.number(),
  imageWidth: z.number(),
  inferenceSteps: z.number(),
  seed: z.number(),
  public: z.boolean(),
  scheduler: SchedulerSchema,
  sdVersion: StableDiffusionVersionSchema,
  status: z.string(),
  presetStyle: z
    .union([
      PresetStylePhotoRealSchema,
      PresetStyleAlchemySchema,
      PresetStyleDefaultSchema,
    ])
    .nullable(),
  initStrength: z.number().nullable(),
  guidanceScale: z.number().nullable(),
  createdAt: z.string(),
  promptMagic: z.boolean(),
  promptMagicVersion: z.number().nullable(),
  promptMagicStrength: z.number().nullable(),
  photoReal: z.boolean(),
  photoRealStrength: z.number().nullable(),
  generation_elements: z.array(z.string()),
})

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

const apiKeySecretSchema = z.object({
  webhookCallbackApiKey: z.string(),
})

export const webhookResponseStatusSchema = z.union([
  z.literal('COMPLETE'),
  z.literal('FAILED'),
])

const baseInnerSchema = z.object({
  createdAt: z.coerce.date(),
  id: z.string(),
  nsfw: z.boolean(),
  public: z.boolean(),
  userId: z.string(),
  status: webhookResponseStatusSchema,
  updatedAt: z.coerce.date(),
  tokenCost: z.number(),
  apiKey: apiKeySecretSchema,
  apiDollarCost: z.string(),
})

const baseOuterSchema = z.object({
  timestamp: z.coerce.date(),
  api_version: z.string(),
})

export const webhookPostProcessingResponseSchema = baseOuterSchema.extend({
  type: z.union([
    z.literal('post_processing.complete'),
    z.literal('post_processing.completed'),
  ]),
  object: z.literal('generated_image_variation_generic'),
  data: z.object({
    object: baseInnerSchema.extend({
      url: z.string(),
      transparent: z.boolean(),
      generatedImageId: z.string(),
      transformType: z.literal('UPSCALE'),
      api: z.boolean(),
    }),
  }),
})

export const webhookImageSchema = z.object({
  createdAt: z.coerce.date(),
  generationId: z.string(),
  id: z.string(),
  nsfw: z.boolean(),
  public: z.boolean(),
  likeCount: z.number(),
  motionGIFURL: z.string().nullable(),
  motionMP4URL: z.string().nullable(),
  teamId: z.string().nullable(),
  trendingScore: z.number(),
  url: z.string(),
  userId: z.string(),
})

export const webhookVideoSchema = z.object({
  createdAt: z.coerce.date(),
  generationId: z.string(),
  id: z.string(),
  likeCount: z.number(),
  motionGIFURL: z.string().nullable(),
  motionMP4URL: z.string(),
  nsfw: z.boolean(),
  public: z.boolean(),
  teamId: z.string().nullable(),
  trendingScore: z.number(),
  url: z.string().nullable(),
  userId: z.string(),
})

//ee6c4224-e56f-4bb5-ab02-2aeb1ae77e7b
export const webhookImageGenerationResponseSchema = baseOuterSchema.extend({
  type: z.literal('image_generation.complete'),
  object: z.literal('generation'),
  data: z.object({
    object: baseInnerSchema.extend({
      flagged: z.boolean(),
      nsfw: z.boolean(),
      images: z.array(webhookImageSchema),
      prompt: z.string(),
    }),
  }),
})

export const webhookVideoGenerationResponseSchema = baseOuterSchema.extend({
  type: z.literal('video_generation.complete'),
  object: z.literal('generation'),
  data: z.object({
    object: baseInnerSchema.extend({
      flagged: z.boolean(),
      nsfw: z.boolean(),
      images: z.array(webhookVideoSchema),
      prompt: z.string().nullable(),
    }),
  }),
})

export const pollingImageGenerationResponseSchema = z.object({
  generations_by_pk: z.object({
    generated_images: z.array(
      z.object({
        url: z.string(),
        nsfw: z.boolean(),
        id: z.string(),
        likeCount: z.number(),
        motionMP4URL: z.string().nullable(),
      })
    ),
    modelId: z.string().nullable(),
    motion: z.boolean().nullable(),
    motionModel: z.string().nullable(),
    motionStrength: z.number().nullable(),
    prompt: z.string(),
    negativePrompt: z.string().nullable(),
    imageHeight: z.number(),
    imageToVideo: z.boolean().nullable(),
    imageWidth: z.number(),
    inferenceSteps: z.number().nullable(),
    seed: z.number().nullable(),
    public: z.boolean(),
    scheduler: SchedulerSchema.nullable(),
    sdVersion: StableDiffusionVersionSchema.nullable(),
    status: z.enum(['COMPLETE', 'FAILED', 'PENDING']),
    id: z.string(),
    createdAt: z.coerce.date(),
    promptMagic: z.boolean().nullable(),
    photoReal: z.boolean().nullable(),
  }),
})

export const pollingVariantImageResponseSchema = z.object({
  generated_image_variation_generic: z.array(
    z.discriminatedUnion('status', [
      z.object({
        url: z.string(),
        status: z.literal('COMPLETE'),
        id: z.string(),
        createdAt: z.string(),
        transformType: z.union([z.literal('UPSCALE'), z.literal('UNZOOM')]),
      }),
      z.object({
        status: z.literal('FAILED'),
      }),
      z.object({
        status: z.literal('PENDING'),
      }),
    ])
  ),
})

export const webhookResponseSchema = z.union([
  webhookImageGenerationResponseSchema,
  webhookPostProcessingResponseSchema,
  webhookVideoGenerationResponseSchema,
])
