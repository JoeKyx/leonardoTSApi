import { z } from 'zod';
export const InvalidValidationResultSchema = z.object({
    valid: z.literal(false),
    errors: z.array(z.string()),
});
export const ValidValidationResultSchema = z.object({
    valid: z.literal(true),
});
export const ValidationResultSchema = z.union([
    InvalidValidationResultSchema,
    ValidValidationResultSchema,
]);
export const ApiErrorSchema = z.object({
    error: z.string(),
    code: z.string(),
});
export const ImageUploadInitResponseSchema = z.object({
    uploadInitImage: z.object({
        id: z.string(),
        fields: z.string(),
        key: z.string(),
        url: z.string(),
        __typename: z.string(),
    }),
});
export const SdGenerationJobSchema = z.union([
    z.object({
        motionSvdGenerationJob: z.object({
            generationId: z.string(),
            apiCreditCost: z.number(),
        }),
    }),
    ApiErrorSchema,
]);
export const GenerationJobResponseSchema = z.union([
    z.object({
        sdGenerationJob: z.object({
            generationId: z.string(),
            apiCreditCost: z.number(),
        }),
    }),
    ApiErrorSchema,
]);
export const UpscaleJobResponseSchema = z.union([
    z.object({
        sdUpscaleJob: z.object({
            id: z.string(),
            apiCreditCost: z.number(),
        }),
    }),
    ApiErrorSchema,
]);
export const VariationResultResponseSchema = z.object({
    generated_image_variation_generic: z.array(z.object({
        url: z.string(),
        status: z.string(),
        id: z.string(),
        createdAt: z.string(),
        transformType: z.union([z.literal('UPSCALE'), z.literal('UNZOOM')]),
    })),
});
