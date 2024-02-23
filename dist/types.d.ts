import { z } from 'zod';
import { ImageExtensionSchema, UpscaleImageResponseSchema, uploadInitImageFromUrlResponseSchema, webhookImageGenerationResponseSchema, webhookPostProcessingResponseSchema, webhookResponseSchema } from './schemas';
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
export type AnimateImageParams = {
    motionStrength?: number;
    isVariation?: boolean;
    isInitImage?: boolean;
};
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
export declare const SdGenerationJobSchema: z.ZodUnion<[z.ZodObject<{
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
export type SVDGenerationJobResponse = z.infer<typeof SdGenerationJobSchema>;
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
export type UpscaleImageResponse = z.infer<typeof UpscaleImageResponseSchema>;
export type AnimateImageResponse = {
    success: true;
    result: {
        id: string;
        url: string;
    };
} | {
    success: false;
    message: string;
};
export type GenerationResultImage = {
    motionMP4URL: string | null;
    id: string;
    url: string;
};
export type SuccessfulGenerationResult = {
    success: true;
    result: {
        prompt: string;
        generationId: string;
        images: GenerationResultImage[];
    };
};
export type SuccessfulWaitingForGenerationResult = {
    success: true;
    result: {
        url: string;
    };
};
export type ImageExtension = z.infer<typeof ImageExtensionSchema>;
export type UploadInitImageFromUrlResponse = z.infer<typeof uploadInitImageFromUrlResponseSchema>;
export type WebhookPostProcessingResultObject = z.infer<typeof webhookPostProcessingResponseSchema>['data']['object'];
export type WebhookGenerationResultObject = z.infer<typeof webhookImageGenerationResponseSchema>['data']['object'];
export type SuccessfulVariationResult = {
    success: true;
    result: {
        method: 'UPSCALE' | 'UNZOOM';
        originalImageId: string;
        url: string;
        variationId: string;
    };
};
export type FailedResult = {
    success: false;
    message: string;
};
export type VariationResult = SuccessfulVariationResult | FailedResult;
export type WebhookResponse = z.infer<typeof webhookResponseSchema>;
export type GenerationResult = SuccessfulGenerationResult | FailedResult;
export type BasicGenerationResult = {
    success: true;
    generationId: string;
} | FailedResult;
export type WaitingForGenerationResult = SuccessfulWaitingForGenerationResult | FailedResult;
type ResultWithoutOriginalImageId = Omit<SuccessfulVariationResult['result'], 'originalImageId'>;
export type SuccessfulVariationResultWithoutOriginalImageId = Omit<SuccessfulVariationResult, 'result'> & {
    result: ResultWithoutOriginalImageId;
};
export type PollingVariationResult = SuccessfulVariationResultWithoutOriginalImageId | FailedResult;
export {};
//# sourceMappingURL=types.d.ts.map