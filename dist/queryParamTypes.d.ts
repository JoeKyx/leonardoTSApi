import { z } from 'zod';
export declare const ControlNetTypeSchema: z.ZodUnion<[z.ZodLiteral<"POSE">, z.ZodLiteral<"CANNY">, z.ZodLiteral<"DEPTH">]>;
export type ControlNetType = z.infer<typeof ControlNetTypeSchema>;
export declare const ElementSchema: z.ZodObject<{
    akUUID: z.ZodString;
    weight: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    akUUID: string;
    weight?: number | undefined;
}, {
    akUUID: string;
    weight?: number | undefined;
}>;
export type Element = z.infer<typeof ElementSchema>;
export declare const PresetStylePhotoRealSchema: z.ZodUnion<[z.ZodLiteral<"CINEMATIC">, z.ZodLiteral<"CREATIVE">, z.ZodLiteral<"VIBRANT">, z.ZodLiteral<"NONE">]>;
export type PresetStylePhotoReal = z.infer<typeof PresetStylePhotoRealSchema>;
export declare const PresetStyleAlchemySchema: z.ZodUnion<[z.ZodLiteral<"ANIME">, z.ZodLiteral<"CREATIVE">, z.ZodLiteral<"DYNAMIC">, z.ZodLiteral<"ENVIRONMENT">, z.ZodLiteral<"GENERAL">, z.ZodLiteral<"ILLUSTRATION">, z.ZodLiteral<"PHOTOGRAPHY">, z.ZodLiteral<"RAYTRACED">, z.ZodLiteral<"RENDER_3D">, z.ZodLiteral<"SKETCH_BW">, z.ZodLiteral<"SKETCH_COLOR">, z.ZodLiteral<"NONE">]>;
export declare enum PresetStylePhotoRealEnum {
    CINEMATIC = "CINEMATIC",
    CREATIVE = "CREATIVE",
    VIBRANT = "VIBRANT",
    NONE = "NONE"
}
export declare enum PresetStyleAlchemyEnum {
    ANIME = "ANIME",
    CREATIVE = "CREATIVE",
    DYNAMIC = "DYNAMIC",
    ENVIRONMENT = "ENVIRONMENT",
    GENERAL = "GENERAL",
    ILLUSTRATION = "ILLUSTRATION",
    PHOTOGRAPHY = "PHOTOGRAPHY",
    RAYTRACED = "RAYTRACED",
    RENDER_3D = "RENDER_3D",
    SKETCH_BW = "SKETCH_BW",
    SKETCH_COLOR = "SKETCH_COLOR",
    NONE = "NONE"
}
export declare enum PresetStyleDefaultEnum {
    LEONARDO = "LEONARDO",
    NONE = "NONE"
}
export type PresetStyleAlchemy = z.infer<typeof PresetStyleAlchemySchema>;
export declare const PresetStyleDefaultSchema: z.ZodUnion<[z.ZodLiteral<"LEONARDO">, z.ZodLiteral<"NONE">]>;
export type PresetStyleDefault = z.infer<typeof PresetStyleDefaultSchema>;
export declare const PromptMagicVersionSchema: z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>]>;
export type PromptMagicVersion = z.infer<typeof PromptMagicVersionSchema>;
export declare const SchedulerSchema: z.ZodUnion<[z.ZodLiteral<"KLMS">, z.ZodLiteral<"EULER_ANCESTRAL_DISCRETE">, z.ZodLiteral<"EULER_DISCRETE">, z.ZodLiteral<"DDIM">, z.ZodLiteral<"DPM_SOLVER">, z.ZodLiteral<"PNDM">, z.ZodLiteral<"LEONARDO">]>;
export type Scheduler = z.infer<typeof SchedulerSchema>;
export declare const StableDiffusionVersionSchema: z.ZodString;
export type StableDiffusionVersion = z.infer<typeof StableDiffusionVersionSchema>;
export declare const ImagePromptSchema: z.ZodString;
export type ImagePrompt = z.infer<typeof ImagePromptSchema>;
export declare const GenerateImageQueryParamsSchema: z.ZodObject<{
    controlNet: z.ZodOptional<z.ZodBoolean>;
    controlNetType: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"POSE">, z.ZodLiteral<"CANNY">, z.ZodLiteral<"DEPTH">]>>;
    elements: z.ZodOptional<z.ZodArray<z.ZodObject<{
        akUUID: z.ZodString;
        weight: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        akUUID: string;
        weight?: number | undefined;
    }, {
        akUUID: string;
        weight?: number | undefined;
    }>, "many">>;
    guidanceScale: z.ZodOptional<z.ZodNumber>;
    height: z.ZodOptional<z.ZodNumber>;
    highContrast: z.ZodOptional<z.ZodBoolean>;
    highResolution: z.ZodOptional<z.ZodBoolean>;
    imagePrompts: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    imagePromptWeight: z.ZodOptional<z.ZodNumber>;
    init_generation_image_id: z.ZodOptional<z.ZodString>;
    init_image_id: z.ZodOptional<z.ZodString>;
    init_strength: z.ZodOptional<z.ZodNumber>;
    modelId: z.ZodOptional<z.ZodString>;
    negative_prompt: z.ZodOptional<z.ZodString>;
    nsfw: z.ZodOptional<z.ZodBoolean>;
    num_images: z.ZodOptional<z.ZodNumber>;
    num_inference_steps: z.ZodOptional<z.ZodNumber>;
    prompt: z.ZodString;
    promptMagic: z.ZodOptional<z.ZodBoolean>;
    promptMagicStrength: z.ZodOptional<z.ZodNumber>;
    promptMagicVersion: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<1>, z.ZodLiteral<2>]>>;
    public: z.ZodOptional<z.ZodBoolean>;
    scheduler: z.ZodOptional<z.ZodUnion<[z.ZodLiteral<"KLMS">, z.ZodLiteral<"EULER_ANCESTRAL_DISCRETE">, z.ZodLiteral<"EULER_DISCRETE">, z.ZodLiteral<"DDIM">, z.ZodLiteral<"DPM_SOLVER">, z.ZodLiteral<"PNDM">, z.ZodLiteral<"LEONARDO">]>>;
    sd_version: z.ZodOptional<z.ZodString>;
    seed: z.ZodOptional<z.ZodNumber>;
    tiling: z.ZodOptional<z.ZodBoolean>;
    unzoom: z.ZodOptional<z.ZodBoolean>;
    unzoomAmount: z.ZodOptional<z.ZodNumber>;
    upscaleRatio: z.ZodOptional<z.ZodNumber>;
    weighthing: z.ZodOptional<z.ZodNumber>;
    width: z.ZodOptional<z.ZodNumber>;
    photoReal: z.ZodOptional<z.ZodBoolean>;
    photoRealStrength: z.ZodOptional<z.ZodNumber>;
    presetStyle: z.ZodOptional<z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<"CINEMATIC">, z.ZodLiteral<"CREATIVE">, z.ZodLiteral<"VIBRANT">, z.ZodLiteral<"NONE">]>, z.ZodUnion<[z.ZodLiteral<"ANIME">, z.ZodLiteral<"CREATIVE">, z.ZodLiteral<"DYNAMIC">, z.ZodLiteral<"ENVIRONMENT">, z.ZodLiteral<"GENERAL">, z.ZodLiteral<"ILLUSTRATION">, z.ZodLiteral<"PHOTOGRAPHY">, z.ZodLiteral<"RAYTRACED">, z.ZodLiteral<"RENDER_3D">, z.ZodLiteral<"SKETCH_BW">, z.ZodLiteral<"SKETCH_COLOR">, z.ZodLiteral<"NONE">]>, z.ZodUnion<[z.ZodLiteral<"LEONARDO">, z.ZodLiteral<"NONE">]>]>>;
    alchemy: z.ZodOptional<z.ZodBoolean>;
    alchemyStrength: z.ZodOptional<z.ZodNumber>;
    contrastRatio: z.ZodOptional<z.ZodNumber>;
    expandedDomain: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    prompt: string;
    controlNet?: boolean | undefined;
    controlNetType?: "POSE" | "CANNY" | "DEPTH" | undefined;
    elements?: {
        akUUID: string;
        weight?: number | undefined;
    }[] | undefined;
    guidanceScale?: number | undefined;
    height?: number | undefined;
    highContrast?: boolean | undefined;
    highResolution?: boolean | undefined;
    imagePrompts?: string[] | undefined;
    imagePromptWeight?: number | undefined;
    init_generation_image_id?: string | undefined;
    init_image_id?: string | undefined;
    init_strength?: number | undefined;
    modelId?: string | undefined;
    negative_prompt?: string | undefined;
    nsfw?: boolean | undefined;
    num_images?: number | undefined;
    num_inference_steps?: number | undefined;
    promptMagic?: boolean | undefined;
    promptMagicStrength?: number | undefined;
    promptMagicVersion?: 2 | 1 | undefined;
    public?: boolean | undefined;
    scheduler?: "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM" | "LEONARDO" | undefined;
    sd_version?: string | undefined;
    seed?: number | undefined;
    tiling?: boolean | undefined;
    unzoom?: boolean | undefined;
    unzoomAmount?: number | undefined;
    upscaleRatio?: number | undefined;
    weighthing?: number | undefined;
    width?: number | undefined;
    photoReal?: boolean | undefined;
    photoRealStrength?: number | undefined;
    presetStyle?: "LEONARDO" | "CINEMATIC" | "CREATIVE" | "VIBRANT" | "NONE" | "ANIME" | "DYNAMIC" | "ENVIRONMENT" | "GENERAL" | "ILLUSTRATION" | "PHOTOGRAPHY" | "RAYTRACED" | "RENDER_3D" | "SKETCH_BW" | "SKETCH_COLOR" | undefined;
    alchemy?: boolean | undefined;
    alchemyStrength?: number | undefined;
    contrastRatio?: number | undefined;
    expandedDomain?: boolean | undefined;
}, {
    prompt: string;
    controlNet?: boolean | undefined;
    controlNetType?: "POSE" | "CANNY" | "DEPTH" | undefined;
    elements?: {
        akUUID: string;
        weight?: number | undefined;
    }[] | undefined;
    guidanceScale?: number | undefined;
    height?: number | undefined;
    highContrast?: boolean | undefined;
    highResolution?: boolean | undefined;
    imagePrompts?: string[] | undefined;
    imagePromptWeight?: number | undefined;
    init_generation_image_id?: string | undefined;
    init_image_id?: string | undefined;
    init_strength?: number | undefined;
    modelId?: string | undefined;
    negative_prompt?: string | undefined;
    nsfw?: boolean | undefined;
    num_images?: number | undefined;
    num_inference_steps?: number | undefined;
    promptMagic?: boolean | undefined;
    promptMagicStrength?: number | undefined;
    promptMagicVersion?: 2 | 1 | undefined;
    public?: boolean | undefined;
    scheduler?: "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM" | "LEONARDO" | undefined;
    sd_version?: string | undefined;
    seed?: number | undefined;
    tiling?: boolean | undefined;
    unzoom?: boolean | undefined;
    unzoomAmount?: number | undefined;
    upscaleRatio?: number | undefined;
    weighthing?: number | undefined;
    width?: number | undefined;
    photoReal?: boolean | undefined;
    photoRealStrength?: number | undefined;
    presetStyle?: "LEONARDO" | "CINEMATIC" | "CREATIVE" | "VIBRANT" | "NONE" | "ANIME" | "DYNAMIC" | "ENVIRONMENT" | "GENERAL" | "ILLUSTRATION" | "PHOTOGRAPHY" | "RAYTRACED" | "RENDER_3D" | "SKETCH_BW" | "SKETCH_COLOR" | undefined;
    alchemy?: boolean | undefined;
    alchemyStrength?: number | undefined;
    contrastRatio?: number | undefined;
    expandedDomain?: boolean | undefined;
}>;
export type GenerateImageQueryParams = z.infer<typeof GenerateImageQueryParamsSchema>;
