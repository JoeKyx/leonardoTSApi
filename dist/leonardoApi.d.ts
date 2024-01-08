import { GenerateImageQueryParams } from './queryParamTypes.js';
import { GenerateImagesResponse, ImageExtension, UploadInitImageFromUrlResponse, UpscaleImageResponse } from './types.js';
export default class LeonardoAPI {
    private apiKey;
    private baseUrl;
    private baseCDNUrl;
    private generationTimeout;
    constructor(apiKey: string, generationTimeout?: number);
    generateImages(params: GenerateImageQueryParams): Promise<GenerateImagesResponse>;
    upscaleImage(imageId: string): Promise<UpscaleImageResponse>;
    uploadInitImageFromUrl: (url: string, fileExtension: ImageExtension) => Promise<UploadInitImageFromUrlResponse>;
    private initUploadImage;
    private uploadImageFromUrl;
    private waitForVariationResult;
    private waitForGenerationResult;
}
export * from './types.js';
export * from './queryParamTypes.js';
export * from './responseTypes.js';
export * from './validators.js';
//# sourceMappingURL=leonardoApi.d.ts.map