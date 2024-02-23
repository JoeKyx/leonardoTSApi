/// <reference types="node" />
import { AnimateImageParams, AnimateImageResponse, BasicGenerationResult, GenerationResult, ImageExtension, UploadInitImageFromUrlResponse, UpscaleImageResponse } from './types';
import { GenerateImageQueryParams } from './queryParamTypes';
export default class LeonardoAPI {
    private apiKey;
    private baseUrl;
    private baseCDNUrl;
    private generationTimeout;
    private webhookApiKey;
    private useWebhook;
    constructor(apiKey: string, useWebhook?: boolean, generationTimeout?: number, webhookApiKey?: string, port?: number);
    close(): void;
    generateImagesBase: (params: GenerateImageQueryParams) => Promise<BasicGenerationResult>;
    generateImages(params: GenerateImageQueryParams): Promise<GenerationResult>;
    animateImageBase: (imageId: string, params?: AnimateImageParams) => Promise<BasicGenerationResult>;
    animateImage(imageId: string, params?: AnimateImageParams): Promise<AnimateImageResponse>;
    upscaleImage(imageId: string): Promise<UpscaleImageResponse>;
    uploadInitImageFromUrl: (url: string, fileExtension: ImageExtension) => Promise<UploadInitImageFromUrlResponse>;
    uploadInitImageFromBuffer: (buffer: Buffer, filename: string) => Promise<UploadInitImageFromUrlResponse>;
    private initUploadImage;
    private uploadImageFromUrl;
    private uploadImageFile;
    private waitForVariationResult;
    private waitForGenerationResult;
    private pollVariationResult;
    private getVariationResult;
    private pollGenerationResult;
    getGenerationResult(generationId: string): Promise<GenerationResult>;
    private webhookHandler;
}
export * from './queryParamTypes';
export * from './types';
export * from './validators';
//# sourceMappingURL=leonardoApi.d.ts.map