/// <reference types="node" />
import { GenerationResult, ImageExtension, UploadInitImageFromUrlResponse, UpscaleImageResponse } from './types';
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
    generateImages(params: GenerateImageQueryParams): Promise<GenerationResult>;
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
    private getGenerationResult;
    private webhookHandler;
}
export * from './types';
export * from './queryParamTypes';
export * from './validators';
//# sourceMappingURL=leonardoApi.d.ts.map