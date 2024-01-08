// TODO: add validation for responses (use zod)
import { GenerateImageQueryParamsSchema, } from './queryParamTypes.js';
import { GenerateImageResponseSchema, } from './responseTypes.js';
import { GenerationJobResponseSchema, } from './types.js';
import fs from 'fs';
import path from 'path';
import { getGlobals } from 'common-es';
const { __dirname } = getGlobals(import.meta.url);
import { getErrorMessage, saveFileTemporarily, } from './utils.js';
import fetch from 'node-fetch';
import FormData from 'form-data';
import axios from 'axios';
export default class LeonardoAPI {
    apiKey;
    baseUrl = 'https://cloud.leonardo.ai/api/rest/v1';
    baseCDNUrl = 'https://cdn.leonardo.ai/';
    generationTimeout;
    constructor(apiKey, generationTimeout = 120000) {
        this.apiKey = apiKey;
        this.generationTimeout = generationTimeout;
    }
    async generateImages(params) {
        try {
            GenerateImageQueryParamsSchema.parse(params);
        }
        catch (error) {
            return {
                success: false,
                error: getErrorMessage(error),
            };
        }
        const startJobUrl = `${this.baseUrl}/generations`;
        const response = await fetch(startJobUrl, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(params),
        });
        const generationJobResponse = (await response.json());
        try {
            GenerationJobResponseSchema.parse(generationJobResponse);
        }
        catch (error) {
            return {
                success: false,
                error: getErrorMessage(error),
            };
        }
        if ('error' in generationJobResponse)
            return { success: false, error: generationJobResponse.error };
        try {
            const generationId = generationJobResponse.sdGenerationJob.generationId;
            const genResult = await this.waitForGenerationResult(generationId);
            if (genResult.success && genResult.generationResult) {
                return {
                    success: true,
                    generationResult: genResult.generationResult,
                };
            }
            else {
                return {
                    success: false,
                    error: 'Generation timeout',
                };
            }
        }
        catch (error) {
            return {
                success: false,
                error: getErrorMessage(error),
            };
        }
    }
    async upscaleImage(imageId) {
        const upscaleUrl = `${this.baseUrl}/variations/upscale`;
        const response = await fetch(upscaleUrl, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify({
                id: imageId,
            }),
        });
        const upscaleJobResponse = (await response.json());
        if ('error' in upscaleJobResponse) {
            return {
                success: false,
                error: upscaleJobResponse.error,
            };
        }
        const upscaleId = upscaleJobResponse.sdUpscaleJob.id;
        const upscaleResult = await this.waitForVariationResult(upscaleId);
        if (upscaleResult.success) {
            return {
                success: true,
                upscaleResult: {
                    url: upscaleResult.variationResult.url,
                    id: upscaleResult.variationResult.id,
                },
            };
        }
        else {
            return {
                success: false,
                error: 'Upscale timeout',
            };
        }
    }
    uploadInitImageFromUrl = async (url, fileExtension) => {
        // init image upload
        const initUploadResponse = await this.initUploadImage(fileExtension);
        // upload image
        try {
            const uploadResponse = await this.uploadImageFromUrl(url, fileExtension, initUploadResponse);
            return {
                success: true,
                uploadInitImageId: initUploadResponse.uploadInitImage.id,
                url: this.baseCDNUrl + initUploadResponse.uploadInitImage.key,
            };
        }
        catch (error) {
            return {
                success: false,
                error: getErrorMessage(error),
            };
        }
    };
    async initUploadImage(fileExtension) {
        // init image upload
        const initUploadUrl = `${this.baseUrl}/init-image`;
        const response = await fetch(initUploadUrl, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.apiKey}`,
                'content-Type': 'application/json',
            },
            body: JSON.stringify({
                extension: fileExtension,
            }),
        });
        const initUploadResponse = (await response.json());
        console.log('json:');
        console.log(initUploadResponse);
        return initUploadResponse;
    }
    async uploadImageFromUrl(url, fileExtension, initUploadResponse) {
        // TODO: remove temp saving of file
        const filePath = await saveFileTemporarily(url, fileExtension);
        // const file = fs.createReadStream(filePath)
        const fields = JSON.parse(initUploadResponse.uploadInitImage.fields);
        let parsedFields = fields;
        if (typeof fields === 'string') {
            parsedFields = JSON.parse(fields);
        }
        else if (!(fields instanceof Object)) {
            throw new Error('Fields must be a JSON string or an object');
        }
        let form = new FormData();
        Object.entries(parsedFields).forEach(([key, value]) => {
            form.append(key, value);
        });
        form.append('file', fs.createReadStream(path.resolve(__dirname, filePath)));
        try {
            const uploadUrl = initUploadResponse.uploadInitImage.url;
            const uploadResponse = await axios.post(uploadUrl, form);
            if (uploadResponse.status >= 300) {
                throw new Error('Upload failed with status: ' + uploadResponse.status);
            }
            console.log(uploadResponse.status);
            console.log(uploadResponse.statusText);
            console.log(uploadResponse.data);
            return uploadResponse;
        }
        catch (error) {
            console.error('Error during file upload:', error);
            throw error;
        }
        finally {
            fs.unlinkSync(filePath);
        }
    }
    async waitForVariationResult(variationId) {
        const variationResultUrl = `${this.baseUrl}/variations/${variationId}`;
        let variationResult;
        const startTime = Date.now();
        do {
            const variationResultResponse = await fetch(variationResultUrl, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${this.apiKey}`,
                },
            });
            variationResult =
                (await variationResultResponse.json());
            if (variationResult.generated_image_variation_generic[0]?.status ===
                'PENDING' ||
                !variationResult.generated_image_variation_generic[0]?.status) {
                // Wait for 1 second before next check
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Check if 2 minutes have elapsed
                if (Date.now() - startTime > this.generationTimeout) {
                    console.log('Variation result timeout.');
                    return {
                        success: false,
                        variationResult: variationResult.generated_image_variation_generic[0],
                    };
                }
            }
        } while (variationResult.generated_image_variation_generic[0]?.status ===
            'PENDING' ||
            !variationResult.generated_image_variation_generic[0]?.status);
        return {
            success: true,
            variationResult: variationResult.generated_image_variation_generic[0],
        };
    }
    async waitForGenerationResult(generationId) {
        const generationResultUrl = `${this.baseUrl}/generations/${generationId}`;
        let generationResult;
        const startTime = Date.now();
        do {
            const generationResultResponse = await fetch(generationResultUrl, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    authorization: `Bearer ${this.apiKey}`,
                },
            });
            generationResult =
                (await generationResultResponse.json());
            console.log('Generation result:');
            console.log(generationResult.generations_by_pk?.status);
            if (generationResult.generations_by_pk?.status === 'PENDING') {
                // Wait for 1 second before next check
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Check if 2 minutes have elapsed
                if (Date.now() - startTime > this.generationTimeout) {
                    console.log('Generation result timeout.');
                    return {
                        success: false,
                        generationResult: generationResult.generations_by_pk,
                    };
                }
            }
        } while (generationResult.generations_by_pk?.status === 'PENDING');
        try {
            console.log(generationResult.generations_by_pk);
            GenerateImageResponseSchema.parse(generationResult.generations_by_pk);
        }
        catch (error) {
            console.log('ERROR');
            console.log(getErrorMessage(error));
            return {
                success: false,
                error: getErrorMessage(error),
            };
        }
        return {
            success: true,
            generationResult: generationResult.generations_by_pk,
        };
    }
}
export * from './types';
export * from './queryParamTypes';
export * from './responseTypes';
export * from './validators';
