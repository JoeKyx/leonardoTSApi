import { z } from 'zod';
export const ControlNetTypeSchema = z.union([
    z.literal('POSE'),
    z.literal('CANNY'),
    z.literal('DEPTH'),
]);
export const ElementSchema = z.object({
    akUUID: z.string(),
    weight: z.number().optional(),
});
export const PresetStylePhotoRealSchema = z.union([
    z.literal('CINEMATIC'),
    z.literal('CREATIVE'),
    z.literal('VIBRANT'),
    z.literal('NONE'),
]);
export const PresetStyleAlchemySchema = z.union([
    z.literal('ANIME'),
    z.literal('CREATIVE'),
    z.literal('DYNAMIC'),
    z.literal('ENVIRONMENT'),
    z.literal('GENERAL'),
    z.literal('ILLUSTRATION'),
    z.literal('PHOTOGRAPHY'),
    z.literal('RAYTRACED'),
    z.literal('RENDER_3D'),
    z.literal('SKETCH_BW'),
    z.literal('SKETCH_COLOR'),
    z.literal('NONE'),
]);
export var PresetStylePhotoRealEnum;
(function (PresetStylePhotoRealEnum) {
    PresetStylePhotoRealEnum["CINEMATIC"] = "CINEMATIC";
    PresetStylePhotoRealEnum["CREATIVE"] = "CREATIVE";
    PresetStylePhotoRealEnum["VIBRANT"] = "VIBRANT";
    PresetStylePhotoRealEnum["NONE"] = "NONE";
})(PresetStylePhotoRealEnum || (PresetStylePhotoRealEnum = {}));
export var PresetStyleAlchemyEnum;
(function (PresetStyleAlchemyEnum) {
    PresetStyleAlchemyEnum["ANIME"] = "ANIME";
    PresetStyleAlchemyEnum["CREATIVE"] = "CREATIVE";
    PresetStyleAlchemyEnum["DYNAMIC"] = "DYNAMIC";
    PresetStyleAlchemyEnum["ENVIRONMENT"] = "ENVIRONMENT";
    PresetStyleAlchemyEnum["GENERAL"] = "GENERAL";
    PresetStyleAlchemyEnum["ILLUSTRATION"] = "ILLUSTRATION";
    PresetStyleAlchemyEnum["PHOTOGRAPHY"] = "PHOTOGRAPHY";
    PresetStyleAlchemyEnum["RAYTRACED"] = "RAYTRACED";
    PresetStyleAlchemyEnum["RENDER_3D"] = "RENDER_3D";
    PresetStyleAlchemyEnum["SKETCH_BW"] = "SKETCH_BW";
    PresetStyleAlchemyEnum["SKETCH_COLOR"] = "SKETCH_COLOR";
    PresetStyleAlchemyEnum["NONE"] = "NONE";
})(PresetStyleAlchemyEnum || (PresetStyleAlchemyEnum = {}));
export var PresetStyleDefaultEnum;
(function (PresetStyleDefaultEnum) {
    PresetStyleDefaultEnum["LEONARDO"] = "LEONARDO";
    PresetStyleDefaultEnum["NONE"] = "NONE";
})(PresetStyleDefaultEnum || (PresetStyleDefaultEnum = {}));
export const PresetStyleDefaultSchema = z.union([
    z.literal('LEONARDO'),
    z.literal('NONE'),
]);
export const PromptMagicVersionSchema = z.union([z.literal(1), z.literal(2)]);
export const SchedulerSchema = z.union([
    z.literal('KLMS'),
    z.literal('EULER_ANCESTRAL_DISCRETE'),
    z.literal('EULER_DISCRETE'),
    z.literal('DDIM'),
    z.literal('DPM_SOLVER'),
    z.literal('PNDM'),
    z.literal('LEONARDO'),
]);
export const StableDiffusionVersionSchema = z.string();
export const ImagePromptSchema = z.string();
export const GenerateImageQueryParamsSchema = z.object({
    controlNet: z.boolean().optional(),
    controlNetType: ControlNetTypeSchema.optional(),
    elements: z.array(ElementSchema).optional(),
    guidanceScale: z.number().optional(),
    height: z.number().optional(),
    highContrast: z.boolean().optional(),
    highResolution: z.boolean().optional(),
    imagePrompts: z.array(ImagePromptSchema).optional(),
    imagePromptWeight: z.number().optional(),
    init_generation_image_id: z.string().optional(),
    init_image_id: z.string().optional(),
    init_strength: z.number().optional(),
    modelId: z.string().optional(),
    negative_prompt: z.string().optional(),
    nsfw: z.boolean().optional(),
    num_images: z.number().optional(),
    num_inference_steps: z.number().optional(),
    prompt: z.string(),
    promptMagic: z.boolean().optional(),
    promptMagicStrength: z.number().optional(),
    promptMagicVersion: PromptMagicVersionSchema.optional(),
    public: z.boolean().optional(),
    scheduler: SchedulerSchema.optional(),
    sd_version: StableDiffusionVersionSchema.optional(),
    seed: z.number().optional(),
    tiling: z.boolean().optional(),
    unzoom: z.boolean().optional(),
    unzoomAmount: z.number().optional(),
    upscaleRatio: z.number().optional(),
    weighthing: z.number().optional(),
    width: z.number().optional(),
    photoReal: z.boolean().optional(),
    photoRealStrength: z.number().optional(),
    presetStyle: z
        .union([
        PresetStylePhotoRealSchema,
        PresetStyleAlchemySchema,
        PresetStyleDefaultSchema,
    ])
        .optional(),
    alchemy: z.boolean().optional(),
    alchemyStrength: z.number().optional(),
    contrastRatio: z.number().optional(),
    expandedDomain: z.boolean().optional(),
});
