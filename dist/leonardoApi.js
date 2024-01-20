import fs from 'fs';
import path from 'path';
import { getGlobals } from 'common-es';
const { __dirname } = getGlobals(import.meta.url);
import { getErrorMessage, saveFileTemporarily, } from './utils.js';
import fetch from 'node-fetch';
import FormData from 'form-data';
import axios from 'axios';
import { default as express } from 'express';
import { EventEmitter } from 'events';
import { GenerationJobResponseSchema } from './schemas.js';
import { GenerateImageQueryParamsSchema, } from './queryParamTypes.js';
class GenerationEventEmitter extends EventEmitter {
}
const generationEventEmitter = new GenerationEventEmitter();
class UpscaleEventEmitter extends EventEmitter {
}
const upscaleEventEmitter = new UpscaleEventEmitter();
export default class LeonardoAPI {
    apiKey;
    baseUrl = 'https://cloud.leonardo.ai/api/rest/v1';
    baseCDNUrl = 'https://cdn.leonardo.ai/';
    generationTimeout;
    constructor(apiKey, webhookApiKey, generationTimeout = 120000, port = 8080) {
        this.apiKey = apiKey;
        this.generationTimeout = generationTimeout;
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.post('/webhook-endpoint', this.webhookHandler);
        app.listen(port, () => {
            console.log('Server running on port ' + port);
        });
    }
    async generateImages(params) {
        try {
            GenerateImageQueryParamsSchema.parse(params);
        }
        catch (error) {
            return {
                success: false,
                message: getErrorMessage(error),
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
                message: getErrorMessage(error),
            };
        }
        if ('error' in generationJobResponse)
            return { success: false, message: generationJobResponse.error };
        try {
            const generationId = generationJobResponse.sdGenerationJob.generationId;
            const genResult = await this.waitForGenerationResult(generationId);
            return genResult;
        }
        catch (error) {
            return {
                success: false,
                message: getErrorMessage(error),
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
        if (upscaleResult && upscaleResult.success) {
            return {
                success: true,
                upscaleResult: {
                    url: upscaleResult.result.url,
                    id: upscaleResult.result.variationId,
                },
            };
        }
        else {
            return {
                success: false,
                error: upscaleResult.message,
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
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject({
                    success: false,
                    message: 'Upscale timeout',
                });
            }, this.generationTimeout);
            upscaleEventEmitter.once(`upscale-complete-${variationId}`, (variationResult) => {
                clearTimeout(timeout);
                resolve({
                    success: true,
                    result: {
                        method: variationResult.transformType,
                        originalImageId: variationResult.generatedImageId,
                        url: variationResult.url,
                        variationId: variationResult.id,
                    },
                });
            });
        });
    }
    async waitForGenerationResult(generationId) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject({
                    success: false,
                    message: 'Generation timeout',
                });
            }, this.generationTimeout);
            generationEventEmitter.once(`generation-complete-${generationId}`, (generationResult) => {
                clearTimeout(timeout);
                resolve({
                    success: true,
                    result: {
                        prompt: generationResult.prompt,
                        generationId: generationResult.id,
                        images: generationResult.images.map((image) => ({
                            id: image.id,
                            url: image.url,
                        })),
                    },
                });
            });
        });
    }
    webhookHandler = async (req, res) => {
        console.log(req.body);
        const generationResultResponse = req.body;
        // Check api key
        if (generationResultResponse.data.object.apiKey.webhookCallbackApiKey !==
            this.apiKey) {
            return {
                success: false,
                error: 'Invalid api key',
            };
        }
        try {
            if (generationResultResponse.type === 'image_generation.complete') {
                generationEventEmitter.emit(`generation-complete-${generationResultResponse.data.object.id}`, generationResultResponse.data.object);
            }
            if (generationResultResponse.type === 'post_processing.complete') {
                upscaleEventEmitter.emit(`upscale-complete-${generationResultResponse.data.object.id}`, generationResultResponse.data.object);
            }
        }
        catch (error) {
            console.log('ERROR');
            console.log(getErrorMessage(error));
            return {
                success: false,
                error: getErrorMessage(error),
            };
        }
    };
}
//  TODO:  convert response to right format
export * from './types.js';
export * from './queryParamTypes.js';
export * from './validators.js';
