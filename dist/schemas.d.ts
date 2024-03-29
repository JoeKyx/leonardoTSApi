import { z } from 'zod';
export declare const InvalidValidationResultSchema: z.ZodObject<{
    valid: z.ZodLiteral<false>;
    errors: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    valid: false;
    errors: string[];
}, {
    valid: false;
    errors: string[];
}>;
export declare const ValidValidationResultSchema: z.ZodObject<{
    valid: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    valid: true;
}, {
    valid: true;
}>;
export declare const ValidationResultSchema: z.ZodUnion<[z.ZodObject<{
    valid: z.ZodLiteral<false>;
    errors: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    valid: false;
    errors: string[];
}, {
    valid: false;
    errors: string[];
}>, z.ZodObject<{
    valid: z.ZodLiteral<true>;
}, "strip", z.ZodTypeAny, {
    valid: true;
}, {
    valid: true;
}>]>;
export declare const ApiErrorSchema: z.ZodObject<{
    error: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    error: string;
}, {
    code: string;
    error: string;
}>;
export declare const ImageExtensionSchema: z.ZodUnion<[z.ZodLiteral<"jpg">, z.ZodLiteral<"jpeg">, z.ZodLiteral<"png">, z.ZodLiteral<"webp">]>;
export declare const ImageUploadInitResponseSchema: z.ZodObject<{
    uploadInitImage: z.ZodObject<{
        id: z.ZodString;
        fields: z.ZodString;
        key: z.ZodString;
        url: z.ZodString;
        __typename: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        key: string;
        id: string;
        url: string;
        fields: string;
        __typename: string;
    }, {
        key: string;
        id: string;
        url: string;
        fields: string;
        __typename: string;
    }>;
}, "strip", z.ZodTypeAny, {
    uploadInitImage: {
        key: string;
        id: string;
        url: string;
        fields: string;
        __typename: string;
    };
}, {
    uploadInitImage: {
        key: string;
        id: string;
        url: string;
        fields: string;
        __typename: string;
    };
}>;
export declare const SdGenerationJobSchema: z.ZodObject<{
    generationId: z.ZodString;
    apiCreditCost: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    generationId: string;
    apiCreditCost: number;
}, {
    generationId: string;
    apiCreditCost: number;
}>;
export declare const GenerationJobResponseSchema: z.ZodUnion<[z.ZodObject<{
    sdGenerationJob: z.ZodObject<{
        generationId: z.ZodString;
        apiCreditCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        generationId: string;
        apiCreditCost: number;
    }, {
        generationId: string;
        apiCreditCost: number;
    }>;
}, "strip", z.ZodTypeAny, {
    sdGenerationJob: {
        generationId: string;
        apiCreditCost: number;
    };
}, {
    sdGenerationJob: {
        generationId: string;
        apiCreditCost: number;
    };
}>, z.ZodObject<{
    error: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    error: string;
}, {
    code: string;
    error: string;
}>]>;
export declare const VariationResultResponseSchema: z.ZodObject<{
    generated_image_variation_generic: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        status: z.ZodString;
        id: z.ZodString;
        createdAt: z.ZodString;
        transformType: z.ZodUnion<[z.ZodLiteral<"UPSCALE">, z.ZodLiteral<"UNZOOM">]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
        status: string;
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    }, {
        id: string;
        url: string;
        status: string;
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    generated_image_variation_generic: {
        id: string;
        url: string;
        status: string;
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    }[];
}, {
    generated_image_variation_generic: {
        id: string;
        url: string;
        status: string;
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    }[];
}>;
export declare const UpscaleImageResponseSchema: z.ZodUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    upscaleResult: z.ZodObject<{
        url: z.ZodString;
        id: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
    }, {
        id: string;
        url: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: true;
    upscaleResult: {
        id: string;
        url: string;
    };
}, {
    success: true;
    upscaleResult: {
        id: string;
        url: string;
    };
}>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, "strip", z.ZodTypeAny, {
    error: string;
    success: false;
}, {
    error: string;
    success: false;
}>]>;
export declare const UpscaleJobResponseSchema: z.ZodUnion<[z.ZodObject<{
    sdUpscaleJob: z.ZodObject<{
        id: z.ZodString;
        apiCreditCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        apiCreditCost: number;
    }, {
        id: string;
        apiCreditCost: number;
    }>;
}, "strip", z.ZodTypeAny, {
    sdUpscaleJob: {
        id: string;
        apiCreditCost: number;
    };
}, {
    sdUpscaleJob: {
        id: string;
        apiCreditCost: number;
    };
}>, z.ZodObject<{
    error: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    error: string;
}, {
    code: string;
    error: string;
}>]>;
export declare const SVDMotionGenerationJobSchema: z.ZodUnion<[z.ZodObject<{
    motionSvdGenerationJob: z.ZodObject<{
        generationId: z.ZodString;
        apiCreditCost: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        generationId: string;
        apiCreditCost: number;
    }, {
        generationId: string;
        apiCreditCost: number;
    }>;
}, "strip", z.ZodTypeAny, {
    motionSvdGenerationJob: {
        generationId: string;
        apiCreditCost: number;
    };
}, {
    motionSvdGenerationJob: {
        generationId: string;
        apiCreditCost: number;
    };
}>, z.ZodObject<{
    error: z.ZodString;
    code: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    error: string;
}, {
    code: string;
    error: string;
}>]>;
export declare const GeneratedImageSchema: z.ZodObject<{
    url: z.ZodString;
    nsfw: z.ZodBoolean;
    id: z.ZodString;
    likeCount: z.ZodNumber;
    motionMP4URL: z.ZodNullable<z.ZodString>;
    generated_image_variation_generics: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: string;
    nsfw: boolean;
    likeCount: number;
    motionMP4URL: string | null;
    generated_image_variation_generics: string[];
}, {
    id: string;
    url: string;
    nsfw: boolean;
    likeCount: number;
    motionMP4URL: string | null;
    generated_image_variation_generics: string[];
}>;
export declare const GenerateImageResponseSchema: z.ZodObject<{
    id: z.ZodString;
    generated_images: z.ZodArray<z.ZodObject<{
        url: z.ZodString;
        nsfw: z.ZodBoolean;
        id: z.ZodString;
        likeCount: z.ZodNumber;
        motionMP4URL: z.ZodNullable<z.ZodString>;
        generated_image_variation_generics: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        motionMP4URL: string | null;
        generated_image_variation_generics: string[];
    }, {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        motionMP4URL: string | null;
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
    createdAt: string;
    generated_images: {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        motionMP4URL: string | null;
        generated_image_variation_generics: string[];
    }[];
    negativePrompt: string | null;
    imageHeight: number;
    imageWidth: number;
    inferenceSteps: number;
    sdVersion: string;
    initStrength: number | null;
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
    createdAt: string;
    generated_images: {
        id: string;
        url: string;
        nsfw: boolean;
        likeCount: number;
        motionMP4URL: string | null;
        generated_image_variation_generics: string[];
    }[];
    negativePrompt: string | null;
    imageHeight: number;
    imageWidth: number;
    inferenceSteps: number;
    sdVersion: string;
    initStrength: number | null;
    generation_elements: string[];
}>;
export declare const uploadInitImageFromUrlResponseSchema: z.ZodUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    uploadInitImageId: z.ZodString;
    url: z.ZodString;
}, "strip", z.ZodTypeAny, {
    url: string;
    success: true;
    uploadInitImageId: string;
}, {
    url: string;
    success: true;
    uploadInitImageId: string;
}>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, "strip", z.ZodTypeAny, {
    error: string;
    success: false;
}, {
    error: string;
    success: false;
}>]>;
export declare const webhookResponseStatusSchema: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
export declare const webhookPostProcessingResponseSchema: z.ZodObject<{
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"post_processing.complete">, z.ZodLiteral<"post_processing.completed">]>;
    object: z.ZodLiteral<"generated_image_variation_generic">;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            public: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            nsfw: z.ZodBoolean;
            createdAt: z.ZodDate;
            userId: z.ZodString;
            updatedAt: z.ZodDate;
            tokenCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
            apiDollarCost: z.ZodString;
            url: z.ZodString;
            transparent: z.ZodBoolean;
            generatedImageId: z.ZodString;
            transformType: z.ZodLiteral<"UPSCALE">;
            api: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        }, {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    }, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: "generated_image_variation_generic";
    type: "post_processing.complete" | "post_processing.completed";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: "generated_image_variation_generic";
    type: "post_processing.complete" | "post_processing.completed";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    };
    timestamp: Date;
    api_version: string;
}>;
export declare const webhookImageSchema: z.ZodObject<{
    createdAt: z.ZodDate;
    generationId: z.ZodString;
    id: z.ZodString;
    nsfw: z.ZodBoolean;
    public: z.ZodBoolean;
    likeCount: z.ZodNumber;
    motionGIFURL: z.ZodNullable<z.ZodString>;
    motionMP4URL: z.ZodNullable<z.ZodString>;
    teamId: z.ZodNullable<z.ZodString>;
    trendingScore: z.ZodNumber;
    url: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: string;
    public: boolean;
    nsfw: boolean;
    generationId: string;
    createdAt: Date;
    likeCount: number;
    motionMP4URL: string | null;
    userId: string;
    motionGIFURL: string | null;
    teamId: string | null;
    trendingScore: number;
}, {
    id: string;
    url: string;
    public: boolean;
    nsfw: boolean;
    generationId: string;
    createdAt: Date;
    likeCount: number;
    motionMP4URL: string | null;
    userId: string;
    motionGIFURL: string | null;
    teamId: string | null;
    trendingScore: number;
}>;
export declare const webhookVideoSchema: z.ZodObject<{
    createdAt: z.ZodDate;
    generationId: z.ZodString;
    id: z.ZodString;
    likeCount: z.ZodNumber;
    motionGIFURL: z.ZodNullable<z.ZodString>;
    motionMP4URL: z.ZodString;
    nsfw: z.ZodBoolean;
    public: z.ZodBoolean;
    teamId: z.ZodNullable<z.ZodString>;
    trendingScore: z.ZodNumber;
    url: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: string | null;
    public: boolean;
    nsfw: boolean;
    generationId: string;
    createdAt: Date;
    likeCount: number;
    motionMP4URL: string;
    userId: string;
    motionGIFURL: string | null;
    teamId: string | null;
    trendingScore: number;
}, {
    id: string;
    url: string | null;
    public: boolean;
    nsfw: boolean;
    generationId: string;
    createdAt: Date;
    likeCount: number;
    motionMP4URL: string;
    userId: string;
    motionGIFURL: string | null;
    teamId: string | null;
    trendingScore: number;
}>;
export declare const webhookImageGenerationResponseSchema: z.ZodObject<{
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    type: z.ZodLiteral<"image_generation.complete">;
    object: z.ZodLiteral<"generation">;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            public: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            createdAt: z.ZodDate;
            userId: z.ZodString;
            updatedAt: z.ZodDate;
            tokenCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
            apiDollarCost: z.ZodString;
            flagged: z.ZodBoolean;
            nsfw: z.ZodBoolean;
            images: z.ZodArray<z.ZodObject<{
                createdAt: z.ZodDate;
                generationId: z.ZodString;
                id: z.ZodString;
                nsfw: z.ZodBoolean;
                public: z.ZodBoolean;
                likeCount: z.ZodNumber;
                motionGIFURL: z.ZodNullable<z.ZodString>;
                motionMP4URL: z.ZodNullable<z.ZodString>;
                teamId: z.ZodNullable<z.ZodString>;
                trendingScore: z.ZodNumber;
                url: z.ZodString;
                userId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }, {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }>, "many">;
            prompt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }, {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }, {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: "generation";
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: "generation";
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}>;
export declare const webhookVideoGenerationResponseSchema: z.ZodObject<{
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    type: z.ZodLiteral<"video_generation.complete">;
    object: z.ZodLiteral<"generation">;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            public: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            createdAt: z.ZodDate;
            userId: z.ZodString;
            updatedAt: z.ZodDate;
            tokenCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
            apiDollarCost: z.ZodString;
            flagged: z.ZodBoolean;
            nsfw: z.ZodBoolean;
            images: z.ZodArray<z.ZodObject<{
                createdAt: z.ZodDate;
                generationId: z.ZodString;
                id: z.ZodString;
                likeCount: z.ZodNumber;
                motionGIFURL: z.ZodNullable<z.ZodString>;
                motionMP4URL: z.ZodString;
                nsfw: z.ZodBoolean;
                public: z.ZodBoolean;
                teamId: z.ZodNullable<z.ZodString>;
                trendingScore: z.ZodNumber;
                url: z.ZodNullable<z.ZodString>;
                userId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }>, "many">;
            prompt: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }, {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }, {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: "generation";
    type: "video_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: "generation";
    type: "video_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}>;
export declare const pollingImageGenerationResponseSchema: z.ZodObject<{
    generations_by_pk: z.ZodObject<{
        generated_images: z.ZodArray<z.ZodObject<{
            url: z.ZodString;
            nsfw: z.ZodBoolean;
            id: z.ZodString;
            likeCount: z.ZodNumber;
            motionMP4URL: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            url: string;
            nsfw: boolean;
            likeCount: number;
            motionMP4URL: string | null;
        }, {
            id: string;
            url: string;
            nsfw: boolean;
            likeCount: number;
            motionMP4URL: string | null;
        }>, "many">;
        modelId: z.ZodNullable<z.ZodString>;
        motion: z.ZodNullable<z.ZodBoolean>;
        motionModel: z.ZodNullable<z.ZodString>;
        motionStrength: z.ZodNullable<z.ZodNumber>;
        prompt: z.ZodString;
        negativePrompt: z.ZodNullable<z.ZodString>;
        imageHeight: z.ZodNumber;
        imageToVideo: z.ZodNullable<z.ZodBoolean>;
        imageWidth: z.ZodNumber;
        inferenceSteps: z.ZodNullable<z.ZodNumber>;
        seed: z.ZodNullable<z.ZodNumber>;
        public: z.ZodBoolean;
        scheduler: z.ZodNullable<z.ZodUnion<[z.ZodLiteral<"KLMS">, z.ZodLiteral<"EULER_ANCESTRAL_DISCRETE">, z.ZodLiteral<"EULER_DISCRETE">, z.ZodLiteral<"DDIM">, z.ZodLiteral<"DPM_SOLVER">, z.ZodLiteral<"PNDM">, z.ZodLiteral<"LEONARDO">]>>;
        sdVersion: z.ZodNullable<z.ZodString>;
        status: z.ZodEnum<["COMPLETE", "FAILED", "PENDING"]>;
        id: z.ZodString;
        createdAt: z.ZodDate;
        promptMagic: z.ZodNullable<z.ZodBoolean>;
        photoReal: z.ZodNullable<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        public: boolean;
        prompt: string;
        status: "COMPLETE" | "FAILED" | "PENDING";
        modelId: string | null;
        promptMagic: boolean | null;
        scheduler: "LEONARDO" | "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM" | null;
        seed: number | null;
        photoReal: boolean | null;
        createdAt: Date;
        generated_images: {
            id: string;
            url: string;
            nsfw: boolean;
            likeCount: number;
            motionMP4URL: string | null;
        }[];
        negativePrompt: string | null;
        imageHeight: number;
        imageWidth: number;
        inferenceSteps: number | null;
        sdVersion: string | null;
        motion: boolean | null;
        motionModel: string | null;
        motionStrength: number | null;
        imageToVideo: boolean | null;
    }, {
        id: string;
        public: boolean;
        prompt: string;
        status: "COMPLETE" | "FAILED" | "PENDING";
        modelId: string | null;
        promptMagic: boolean | null;
        scheduler: "LEONARDO" | "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM" | null;
        seed: number | null;
        photoReal: boolean | null;
        createdAt: Date;
        generated_images: {
            id: string;
            url: string;
            nsfw: boolean;
            likeCount: number;
            motionMP4URL: string | null;
        }[];
        negativePrompt: string | null;
        imageHeight: number;
        imageWidth: number;
        inferenceSteps: number | null;
        sdVersion: string | null;
        motion: boolean | null;
        motionModel: string | null;
        motionStrength: number | null;
        imageToVideo: boolean | null;
    }>;
}, "strip", z.ZodTypeAny, {
    generations_by_pk: {
        id: string;
        public: boolean;
        prompt: string;
        status: "COMPLETE" | "FAILED" | "PENDING";
        modelId: string | null;
        promptMagic: boolean | null;
        scheduler: "LEONARDO" | "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM" | null;
        seed: number | null;
        photoReal: boolean | null;
        createdAt: Date;
        generated_images: {
            id: string;
            url: string;
            nsfw: boolean;
            likeCount: number;
            motionMP4URL: string | null;
        }[];
        negativePrompt: string | null;
        imageHeight: number;
        imageWidth: number;
        inferenceSteps: number | null;
        sdVersion: string | null;
        motion: boolean | null;
        motionModel: string | null;
        motionStrength: number | null;
        imageToVideo: boolean | null;
    };
}, {
    generations_by_pk: {
        id: string;
        public: boolean;
        prompt: string;
        status: "COMPLETE" | "FAILED" | "PENDING";
        modelId: string | null;
        promptMagic: boolean | null;
        scheduler: "LEONARDO" | "KLMS" | "EULER_ANCESTRAL_DISCRETE" | "EULER_DISCRETE" | "DDIM" | "DPM_SOLVER" | "PNDM" | null;
        seed: number | null;
        photoReal: boolean | null;
        createdAt: Date;
        generated_images: {
            id: string;
            url: string;
            nsfw: boolean;
            likeCount: number;
            motionMP4URL: string | null;
        }[];
        negativePrompt: string | null;
        imageHeight: number;
        imageWidth: number;
        inferenceSteps: number | null;
        sdVersion: string | null;
        motion: boolean | null;
        motionModel: string | null;
        motionStrength: number | null;
        imageToVideo: boolean | null;
    };
}>;
export declare const pollingVariantImageResponseSchema: z.ZodObject<{
    generated_image_variation_generic: z.ZodArray<z.ZodDiscriminatedUnion<"status", [z.ZodObject<{
        url: z.ZodString;
        status: z.ZodLiteral<"COMPLETE">;
        id: z.ZodString;
        createdAt: z.ZodString;
        transformType: z.ZodUnion<[z.ZodLiteral<"UPSCALE">, z.ZodLiteral<"UNZOOM">]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        url: string;
        status: "COMPLETE";
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    }, {
        id: string;
        url: string;
        status: "COMPLETE";
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    }>, z.ZodObject<{
        status: z.ZodLiteral<"FAILED">;
    }, "strip", z.ZodTypeAny, {
        status: "FAILED";
    }, {
        status: "FAILED";
    }>, z.ZodObject<{
        status: z.ZodLiteral<"PENDING">;
    }, "strip", z.ZodTypeAny, {
        status: "PENDING";
    }, {
        status: "PENDING";
    }>]>, "many">;
}, "strip", z.ZodTypeAny, {
    generated_image_variation_generic: ({
        id: string;
        url: string;
        status: "COMPLETE";
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    } | {
        status: "FAILED";
    } | {
        status: "PENDING";
    })[];
}, {
    generated_image_variation_generic: ({
        id: string;
        url: string;
        status: "COMPLETE";
        createdAt: string;
        transformType: "UPSCALE" | "UNZOOM";
    } | {
        status: "FAILED";
    } | {
        status: "PENDING";
    })[];
}>;
export declare const webhookResponseSchema: z.ZodUnion<[z.ZodObject<{
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    type: z.ZodLiteral<"image_generation.complete">;
    object: z.ZodLiteral<"generation">;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            public: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            createdAt: z.ZodDate;
            userId: z.ZodString;
            updatedAt: z.ZodDate;
            tokenCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
            apiDollarCost: z.ZodString;
            flagged: z.ZodBoolean;
            nsfw: z.ZodBoolean;
            images: z.ZodArray<z.ZodObject<{
                createdAt: z.ZodDate;
                generationId: z.ZodString;
                id: z.ZodString;
                nsfw: z.ZodBoolean;
                public: z.ZodBoolean;
                likeCount: z.ZodNumber;
                motionGIFURL: z.ZodNullable<z.ZodString>;
                motionMP4URL: z.ZodNullable<z.ZodString>;
                teamId: z.ZodNullable<z.ZodString>;
                trendingScore: z.ZodNumber;
                url: z.ZodString;
                userId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }, {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }>, "many">;
            prompt: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }, {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }, {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: "generation";
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: "generation";
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string | null;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}>, z.ZodObject<{
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    type: z.ZodUnion<[z.ZodLiteral<"post_processing.complete">, z.ZodLiteral<"post_processing.completed">]>;
    object: z.ZodLiteral<"generated_image_variation_generic">;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            public: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            nsfw: z.ZodBoolean;
            createdAt: z.ZodDate;
            userId: z.ZodString;
            updatedAt: z.ZodDate;
            tokenCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
            apiDollarCost: z.ZodString;
            url: z.ZodString;
            transparent: z.ZodBoolean;
            generatedImageId: z.ZodString;
            transformType: z.ZodLiteral<"UPSCALE">;
            api: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        }, {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    }, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: "generated_image_variation_generic";
    type: "post_processing.complete" | "post_processing.completed";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: "generated_image_variation_generic";
    type: "post_processing.complete" | "post_processing.completed";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            transformType: "UPSCALE";
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            generatedImageId: string;
            api: boolean;
        };
    };
    timestamp: Date;
    api_version: string;
}>, z.ZodObject<{
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    type: z.ZodLiteral<"video_generation.complete">;
    object: z.ZodLiteral<"generation">;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            public: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            createdAt: z.ZodDate;
            userId: z.ZodString;
            updatedAt: z.ZodDate;
            tokenCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
            apiDollarCost: z.ZodString;
            flagged: z.ZodBoolean;
            nsfw: z.ZodBoolean;
            images: z.ZodArray<z.ZodObject<{
                createdAt: z.ZodDate;
                generationId: z.ZodString;
                id: z.ZodString;
                likeCount: z.ZodNumber;
                motionGIFURL: z.ZodNullable<z.ZodString>;
                motionMP4URL: z.ZodString;
                nsfw: z.ZodBoolean;
                public: z.ZodBoolean;
                teamId: z.ZodNullable<z.ZodString>;
                trendingScore: z.ZodNumber;
                url: z.ZodNullable<z.ZodString>;
                userId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }>, "many">;
            prompt: z.ZodNullable<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }, {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }, {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: "generation";
    type: "video_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: "generation";
    type: "video_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            prompt: string | null;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            tokenCost: number;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            apiDollarCost: string;
            flagged: boolean;
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                generationId: string;
                createdAt: Date;
                likeCount: number;
                motionMP4URL: string;
                userId: string;
                motionGIFURL: string | null;
                teamId: string | null;
                trendingScore: number;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}>]>;
//# sourceMappingURL=schemas.d.ts.map