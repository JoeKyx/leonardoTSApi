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
export const webhookResponseStatusSchema = z.union([
    z.literal('COMPLETE'),
    z.literal('FAILED'),
]);
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
    url: z.string().nullable(),
    userId: z.string(),
});
const apiKeySecretSchema = z.object({
    webhookCallbackApiKey: z.string(),
});
export const webhookImageGenerationResponseSchema = z.object({
    type: z.literal('image_generation.complete'),
    object: z.string(),
    timestamp: z.coerce.date(),
    api_version: z.string(),
    data: z.object({
        object: z.object({
            id: z.string(),
            createdAt: z.coerce.date(),
            updatedAt: z.coerce.date(),
            userId: z.string(),
            public: z.boolean(),
            flagged: z.boolean(),
            nsfw: z.boolean(),
            status: webhookResponseStatusSchema,
            apiKey: apiKeySecretSchema,
            images: z.array(webhookImageSchema),
        }),
    }),
});
export const webhookPostProcessingResponseSchema = z.object({
    type: z.literal('post_processing.complete'),
    object: z.string(),
    timestamp: z.coerce.date(),
    api_version: z.string(),
    data: z.object({
        object: z.object({
            id: z.string(),
            createdAt: z.coerce.date(),
            updatedAt: z.coerce.date(),
            status: z.string(),
            url: z.string(),
            transparent: z.boolean(),
            generatedImageId: z.string(),
            transformType: z.string(),
            api: z.boolean(),
            tokenCost: z.number(),
            apiDollarCost: z.number(),
            apiKey: apiKeySecretSchema,
        }),
    }),
});
export const webhookResponseSchema = z.union([
    webhookImageGenerationResponseSchema,
    webhookPostProcessingResponseSchema,
]);
