import { z } from 'zod';
export declare const GeneratedImageSchema: z.ZodObject<{
    url: z.ZodString;
    nsfw: z.ZodBoolean;
    id: z.ZodString;
    likeCount: z.ZodNumber;
    generated_image_variation_generics: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: string;
    nsfw: boolean;
    likeCount: number;
    generated_image_variation_generics: string[];
}, {
    id: string;
    url: string;
    nsfw: boolean;
    likeCount: number;
    generated_image_variation_generics: string[];
}>;
export declare const GenerateImageResponseSchema: z.ZodObject<{
    id: z.ZodString;
    generated_images: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        nsfw: z.ZodBoolean;
        id: z.ZodString;
        likeCount: z.ZodNumber;
        generated_image_variation_generics: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        generated_image_variation_generics: string[];
    }, {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        generated_image_variation_generics: string[];
    }>, "many">;
    modelId: z.ZodNullable<z.ZodString>;
    prompt: z.ZodString;
    negativePrompt: z.ZodNullable<z.ZodString>;
    imageHeight: z.ZodNumber;
    imageWidth: z.ZodNumber;
    inferenceSteps: z.ZodNumber;
    seed: z.ZodNumber;
    public: z.ZodBoolean;
    scheduler: z.ZodUnion<[z.ZodLiteral<"KLMS">, z.ZodLiteral<"EULER_ANCESTRAL_DISCRETE">, z.ZodLiteral<"EULER_DISCRETE">, z.ZodLiteral<"DDIM">, z.ZodLiteral<"DPM_SOLVER">, z.ZodLiteral<"PNDM">, z.ZodLiteral<"LEONARDO">]>;
    sdVersion: z.ZodString;
    status: z.ZodString;
    presetStyle: z.ZodNullable<z.ZodUnion<[z.ZodUnion<[z.ZodLiteral<"CINEMATIC">, z.ZodLiteral<"CREATIVE">, z.ZodLiteral<"VIBRANT">, z.ZodLiteral<"NONE">]>, z.ZodUnion<[z.ZodLiteral<"ANIME">, z.ZodLiteral<"CREATIVE">, z.ZodLiteral<"DYNAMIC">, z.ZodLiteral<"ENVIRONMENT">, z.ZodLiteral<"GENERAL">, z.ZodLiteral<"ILLUSTRATION">, z.ZodLiteral<"PHOTOGRAPHY">, z.ZodLiteral<"RAYTRACED">, z.ZodLiteral<"RENDER_3D">, z.ZodLiteral<"SKETCH_BW">, z.ZodLiteral<"SKETCH_COLOR">, z.ZodLiteral<"NONE">]>, z.ZodUnion<[z.ZodLiteral<"LEONARDO">, z.ZodLiteral<"NONE">]>]>>;
    initStrength: z.ZodNullable<z.ZodNumber>;
    guidanceScale: z.ZodNullable<z.ZodNumber>;
    createdAt: z.ZodString;
    promptMagic: z.ZodBoolean;
    promptMagicVersion: z.ZodNullable<z.ZodNumber>;
    promptMagicStrength: z.ZodNullable<z.ZodNumber>;
    photoReal: z.ZodBoolean;
    photoRealStrength: z.ZodNullable<z.ZodNumber>;
    generation_elements: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    public: boolean;
    prompt: string;
    status: string;
    guidanceScale: number | null;
    modelId: string | null;
    promptMagic: boolean;
    promptMagicStrength: number | null;
    promptMagicVersion: number | null;
    scheduler: "LEONARDO" | "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM";
    seed: number;
    photoReal: boolean;
    photoRealStrength: number | null;
    presetStyle: "CINEMATIC" | "CREATIVE" | "VIBRANT" | "NONE" | "ANIME" | "DYNAMIC" | "ENVIRONMENT" | "GENERAL" | "ILLUSTRATION" | "PHOTOGRAPHY" | "RAYTRACED" | "RENDER_3D" | "SKETCH_BW" | "SKETCH_COLOR" | "LEONARDO" | null;
    generated_images: {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        generated_image_variation_generics: string[];
    }[];
    negativePrompt: string | null;
    imageHeight: number;
    imageWidth: number;
    inferenceSteps: number;
    sdVersion: string;
    initStrength: number | null;
    createdAt: string;
    generation_elements: string[];
}, {
    id: string;
    public: boolean;
    prompt: string;
    status: string;
    guidanceScale: number | null;
    modelId: string | null;
    promptMagic: boolean;
    promptMagicStrength: number | null;
    promptMagicVersion: number | null;
    scheduler: "LEONARDO" | "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM";
    seed: number;
    photoReal: boolean;
    photoRealStrength: number | null;
    presetStyle: "CINEMATIC" | "CREATIVE" | "VIBRANT" | "NONE" | "ANIME" | "DYNAMIC" | "ENVIRONMENT" | "GENERAL" | "ILLUSTRATION" | "PHOTOGRAPHY" | "RAYTRACED" | "RENDER_3D" | "SKETCH_BW" | "SKETCH_COLOR" | "LEONARDO" | null;
    generated_images: {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        generated_image_variation_generics: string[];
    }[];
    negativePrompt: string | null;
    imageHeight: number;
    imageWidth: number;
    inferenceSteps: number;
    sdVersion: string;
    initStrength: number | null;
    createdAt: string;
    generation_elements: string[];
}>;
export type GenerateImageResponse = z.infer<typeof GenerateImageResponseSchema>;
export type GeneratedImage = z.infer<typeof GeneratedImageSchema>;
//# sourceMappingURL=responseTypes.d.ts.map