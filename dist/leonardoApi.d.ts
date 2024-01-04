import { GenerateImageQueryParams } from './queryParamTypes';
import { GenerateImagesResponse, ImageExtension, UploadInitImageFromUrlResponse, UpscaleImageResponse } from './types';
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
