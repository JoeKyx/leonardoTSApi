import { GenerationResult, ImageExtension, UploadInitImageFromUrlResponse, UpscaleImageResponse } from './types.js';
import { GenerateImageQueryParams } from './queryParamTypes.js';
export default class LeonardoAPI {
    private apiKey;
    private baseUrl;
    private baseCDNUrl;
    private generationTimeout;
    private webhookApiKey;
    constructor(apiKey: string, webhookApiKey: string, generationTimeout?: number, port?: number);
    generateImages(params: GenerateImageQueryParams): Promise<GenerationResult>;
    upscaleImage(imageId: string): Promise<UpscaleImageResponse>;
    uploadInitImageFromUrl: (url: string, fileExtension: ImageExtension) => Promise<UploadInitImageFromUrlResponse>;
    private initUploadImage;
    private uploadImageFromUrl;
    private waitForVariationResult;
    private waitForGenerationResult;
    private webhookHandler;
}
export * from './types.js';
export * from './queryParamTypes.js';
export * from './validators.js';
//# sourceMappingURL=leonardoApi.d.ts.map