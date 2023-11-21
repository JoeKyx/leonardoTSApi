import { z } from 'zod'
import {
  PresetStyleAlchemy,
  PresetStyleAlchemySchema,
  PresetStyleDefault,
  PresetStyleDefaultSchema,
  PresetStylePhotoReal,
  PresetStylePhotoRealSchema,
  Scheduler,
  SchedulerSchema,
  StableDiffusionVersion,
  StableDiffusionVersionSchema,
} from './queryParamTypes'

export const GeneratedImageSchema = z.object({
  url: z.string(),
  nsfw: z.boolean(),
  id: z.string(),
  likeCount: z.number(),
  generatedImageVariationGenerics: z.array(z.string()),
})

export const GenerateImageResponseSchema = z.object({
  apiCreditCost: z.number(),
  id: z.string(),
  generated_image: GeneratedImageSchema,
  modelId: z.string(),
  prompt: z.string(),
  negativePrompt: z.string(),
  imageHeight: z.number(),
  imageWidth: z.number(),
  inferenceSteps: z.number(),
  seed: z.number(),
  public: z.boolean(),
  scheduler: SchedulerSchema,
  sdVersion: StableDiffusionVersionSchema,
  status: z.string(),
  presetStyle: z.union([
    PresetStylePhotoRealSchema,
    PresetStyleAlchemySchema,
    PresetStyleDefaultSchema,
  ]),
  initStrength: z.number(),
  guidanceScale: z.number(),
  createdAt: z.string(),
  promptMagic: z.boolean(),
  promptMagicVersion: z.number().nullable(),
  promptMagicStrength: z.number().nullable(),
  photoReal: z.boolean(),
  photoRealStrength: z.number().nullable(),
  generation_elements: z.array(z.string()),
})

export type GenerateImageResponse = z.infer<typeof GenerateImageResponseSchema>

export type GeneratedImage = z.infer<typeof GeneratedImageSchema>

//87defef5-3e35-4ea6-b5bb-bebbce4e6df3
