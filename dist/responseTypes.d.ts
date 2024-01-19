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
export declare const webhookResponseStatusSchema: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
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
    url: z.ZodNullable<z.ZodString>;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    url: string | null;
    public: boolean;
    nsfw: boolean;
    likeCount: number;
    createdAt: Date;
    generationId: string;
    motionGIFURL: string | null;
    motionMP4URL: string | null;
    teamId: string | null;
    trendingScore: number;
    userId: string;
}, {
    id: string;
    url: string | null;
    public: boolean;
    nsfw: boolean;
    likeCount: number;
    createdAt: Date;
    generationId: string;
    motionGIFURL: string | null;
    motionMP4URL: string | null;
    teamId: string | null;
    trendingScore: number;
    userId: string;
}>;
export declare const webhookImageGenerationResponseSchema: z.ZodObject<{
    type: z.ZodLiteral<"image_generation.complete">;
    object: z.ZodString;
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            userId: z.ZodString;
            public: z.ZodBoolean;
            flagged: z.ZodBoolean;
            nsfw: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
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
                url: z.ZodNullable<z.ZodString>;
                userId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        }, {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    }, {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: string;
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: string;
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}>;
export declare const webhookPostProcessingResponseSchema: z.ZodObject<{
    type: z.ZodLiteral<"post_processing.complete">;
    object: z.ZodString;
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            status: z.ZodString;
            url: z.ZodString;
            transparent: z.ZodBoolean;
            generatedImageId: z.ZodString;
            transformType: z.ZodString;
            api: z.ZodBoolean;
            tokenCost: z.ZodNumber;
            apiDollarCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        }, {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    }, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: string;
    type: "post_processing.complete";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: string;
    type: "post_processing.complete";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    };
    timestamp: Date;
    api_version: string;
}>;
export declare const webhookResponseSchema: z.ZodUnion<[z.ZodObject<{
    type: z.ZodLiteral<"image_generation.complete">;
    object: z.ZodString;
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            userId: z.ZodString;
            public: z.ZodBoolean;
            flagged: z.ZodBoolean;
            nsfw: z.ZodBoolean;
            status: z.ZodUnion<[z.ZodLiteral<"COMPLETE">, z.ZodLiteral<"FAILED">]>;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
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
                url: z.ZodNullable<z.ZodString>;
                userId: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }, {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        }, {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    }, {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: string;
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: string;
    type: "image_generation.complete";
    data: {
        object: {
            id: string;
            public: boolean;
            status: "COMPLETE" | "FAILED";
            nsfw: boolean;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            flagged: boolean;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            images: {
                id: string;
                url: string | null;
                public: boolean;
                nsfw: boolean;
                likeCount: number;
                createdAt: Date;
                generationId: string;
                motionGIFURL: string | null;
                motionMP4URL: string | null;
                teamId: string | null;
                trendingScore: number;
                userId: string;
            }[];
        };
    };
    timestamp: Date;
    api_version: string;
}>, z.ZodObject<{
    type: z.ZodLiteral<"post_processing.complete">;
    object: z.ZodString;
    timestamp: z.ZodDate;
    api_version: z.ZodString;
    data: z.ZodObject<{
        object: z.ZodObject<{
            id: z.ZodString;
            createdAt: z.ZodDate;
            updatedAt: z.ZodDate;
            status: z.ZodString;
            url: z.ZodString;
            transparent: z.ZodBoolean;
            generatedImageId: z.ZodString;
            transformType: z.ZodString;
            api: z.ZodBoolean;
            tokenCost: z.ZodNumber;
            apiDollarCost: z.ZodNumber;
            apiKey: z.ZodObject<{
                webhookCallbackApiKey: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                webhookCallbackApiKey: string;
            }, {
                webhookCallbackApiKey: string;
            }>;
        }, "strip", z.ZodTypeAny, {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        }, {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        }>;
    }, "strip", z.ZodTypeAny, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    }, {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    }>;
}, "strip", z.ZodTypeAny, {
    object: string;
    type: "post_processing.complete";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    };
    timestamp: Date;
    api_version: string;
}, {
    object: string;
    type: "post_processing.complete";
    data: {
        object: {
            transparent: boolean;
            id: string;
            url: string;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            apiKey: {
                webhookCallbackApiKey: string;
            };
            generatedImageId: string;
            transformType: string;
            api: boolean;
            tokenCost: number;
            apiDollarCost: number;
        };
    };
    timestamp: Date;
    api_version: string;
}>]>;
export type WebhookImageGenerationResponse = z.infer<typeof webhookImageGenerationResponseSchema>;
export type ResponseImage = z.infer<typeof webhookImageSchema>;
export type WebhookGenerationResultObject = z.infer<typeof webhookImageGenerationResponseSchema>['data']['object'];
export type WebhookPostProcessingResultObject = z.infer<typeof webhookPostProcessingResponseSchema>['data']['object'];
export type GenerationResult = {
    success: false;
    message: string;
} | {
    success: true;
    result: WebhookGenerationResultObject;
};
export type VariationResult = {
    success: false;
    message: string;
} | {
    success: true;
    result: WebhookPostProcessingResultObject;
};
export type WebhookResponse = z.infer<typeof webhookResponseSchema>;
//# sourceMappingURL=responseTypes.d.ts.map