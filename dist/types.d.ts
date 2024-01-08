import { z } from 'zod';
import { GenerateImageResponse } from './responseTypes';
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
export type ValidValidationResult = z.infer<typeof ValidValidationResultSchema>;
export type InvalidValidationResult = z.infer<typeof InvalidValidationResultSchema>;
export type ValidationResult = z.infer<typeof ValidationResultSchema>;
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
export type APIError = z.infer<typeof ApiErrorSchema>;
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
export type ImageUploadInitResponse = z.infer<typeof ImageUploadInitResponseSchema>;
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
export type GenerationJobResponse = z.infer<typeof GenerationJobResponseSchema>;
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
export type UpscaleJobResponse = z.infer<typeof UpscaleJobResponseSchema>;
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
export type VariationResultResponse = z.infer<typeof VariationResultResponseSchema>;
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
export type UpscaleImageResponse = z.infer<typeof UpscaleImageResponseSchema>;
export type GenerationResultResponse = {
    generations_by_pk: GenerateImageResponse | null | undefined;
};
export type GenerateImagesResponse = {
    success: true;
    generationResult: GenerateImageResponse;
} | {
    success: false;
    error: string;
};
export type ImageExtension = 'jpg' | 'png' | 'jpeg' | 'webp';
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
export type UploadInitImageFromUrlResponse = z.infer<typeof uploadInitImageFromUrlResponseSchema>;
//# sourceMappingURL=types.d.ts.map