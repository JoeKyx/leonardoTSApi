import { z } from 'zod';
import { PresetStyleAlchemySchema, PresetStyleDefaultSchema, PresetStylePhotoRealSchema, SchedulerSchema, StableDiffusionVersionSchema, } from './queryParamTypes.js';
export const GeneratedImageSchema = z.object({
    url: z.string(),
    nsfw: z.boolean(),
    id: z.string(),
    likeCount: z.number(),
    generated_image_variation_generics: z.array(z.string()),
});
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
});
//87defef5-3e35-4ea6-b5bb-bebbce4e6df3
