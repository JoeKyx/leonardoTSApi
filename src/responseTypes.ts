import { z } from 'zod'
import {
  PresetStyleAlchemySchema,
  PresetStyleDefaultSchema,
  PresetStylePhotoRealSchema,
  SchedulerSchema,
  StableDiffusionVersionSchema,
} from './queryParamTypes.js'
import {
  GenerateImageResponseSchema,
  GeneratedImageSchema,
  webhookImageGenerationResponseSchema,
  webhookImageSchema,
  webhookPostProcessingResponseSchema,
  webhookResponseSchema,
} from './schemas.js'
