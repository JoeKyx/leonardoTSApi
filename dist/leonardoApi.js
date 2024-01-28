import fs from 'fs';
import path from 'path';
import { getErrorMessage, saveFileTemporarily } from './utils';
import fetch from 'node-fetch';
import FormData from 'form-data';
import axios from 'axios';
import { default as express } from 'express';
import { EventEmitter } from 'events';
import { GenerationJobResponseSchema, ImageExtensionSchema, pollingImageGenerationResponseSchema, pollingVariantImageResponseSchema, webhookResponseSchema, } from './schemas';
import { GenerateImageQueryParamsSchema, } from './queryParamTypes';
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
    webhookApiKey;
    useWebhook = false;
    constructor(apiKey, useWebhook = false, generationTimeout = 120000, webhookApiKey, port) {
        this.apiKey = apiKey;
        this.generationTimeout = generationTimeout;
        console.log('Webhook api key:');
        console.log(webhookApiKey);
        this.webhookApiKey = webhookApiKey;
        this.useWebhook = useWebhook;
        if (useWebhook) {
            const portToUse = port || 3050;
            console.log('Port: ' + portToUse);
            const app = express();
            app.use(express.json());
            app.use(express.urlencoded({ extended: true }));
            app.get('/webhook-endpoint', (req, res) => {
                res.send('Leonardo API');
            });
            app.post('/webhook-endpoint', this.webhookHandler);
            app.get('/', (req, res) => {
                res.send('Leonardo API');
            });
            app.listen(portToUse, () => {
                console.log('Server running on port ' + portToUse);
            });
        }
    }
    close() {
        if (this.useWebhook) {
            console.log('Closing webhook server');
            process.exit(0);
        }
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
    uploadInitImageFromBuffer = async (buffer, filename) => {
        // init image upload
        const fileExtension = ImageExtensionSchema.safeParse(filename.split('.').pop());
        if (!fileExtension.success) {
            return {
                success: false,
                error: 'Invalid file extension',
            };
        }
        const initUploadResponse = await this.initUploadImage(fileExtension.data);
        // upload image
        try {
            const uploadResponse = await this.uploadImageFile(buffer, filename, initUploadResponse);
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
        form.append('file', fs.createReadStream(path.resolve(filePath)));
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
    async uploadImageFile(buffer, filename, initUploadResponse) {
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
        form.append('file', buffer, filename);
        try {
            const uploadUrl = initUploadResponse.uploadInitImage.url;
            const uploadResponse = await axios.post(uploadUrl, form, {
                headers: form.getHeaders(),
            });
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
    }
    async waitForVariationResult(variationId) {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject({
                    success: false,
                    message: 'Upscale timeout',
                });
            }, this.generationTimeout);
            if (!this.useWebhook || !this.webhookApiKey) {
                console.log('Using polling');
                this.pollVariationResult(variationId, resolve, reject, timeout);
            }
            else {
                upscaleEventEmitter.once(`upscale-complete-${variationId}`, (variationResult) => {
                    clearTimeout(timeout);
                    resolve({
                        success: true,
                        result: {
                            method: variationResult.transformType,
                            url: variationResult.url,
                            variationId: variationResult.id,
                        },
                    });
                });
            }
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
            console.log('Waiting for generation result ' + generationId + '...');
            if (!this.useWebhook || !this.webhookApiKey) {
                console.log('Using polling');
                this.pollGenerationResult(generationId, resolve, reject, timeout);
            }
            else {
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
            }
        });
    }
    async pollVariationResult(variationId, resolve, reject, timeout) {
        const variationResult = await this.getVariationResult(variationId);
        if (variationResult.success) {
            clearTimeout(timeout);
            resolve(variationResult);
        }
        else if (variationResult.message == 'PENDING') {
            setTimeout(() => {
                this.pollVariationResult(variationId, resolve, reject, timeout);
            }, 1000);
        }
        else {
            clearTimeout(timeout);
            reject(variationResult);
        }
    }
    async getVariationResult(variationId) {
        const variationResultUrl = `${this.baseUrl}/variations/${variationId}`;
        const response = await fetch(variationResultUrl, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.apiKey}`,
            },
        });
        const variationResultJson = await response.json();
        const pollingImageResponse = pollingVariantImageResponseSchema.safeParse(variationResultJson);
        if (pollingImageResponse.success &&
            pollingImageResponse.data.generated_image_variation_generic.length > 0) {
            const variationResult = pollingImageResponse.data.generated_image_variation_generic[0];
            if (variationResult.status == 'COMPLETE') {
                return {
                    success: true,
                    result: {
                        method: variationResult.transformType,
                        url: variationResult.url,
                        variationId: variationResult.id,
                    },
                };
            }
            else if (variationResult.status == 'PENDING') {
                return {
                    success: false,
                    message: variationResult.status,
                };
            }
            else {
                return {
                    success: false,
                    message: 'variation failed (Code 1)',
                };
            }
        }
        else if (!pollingImageResponse.success) {
            console.log(pollingImageResponse.error);
            return {
                success: false,
                message: 'variation failed (Code 0)',
            };
        }
        else {
            return {
                success: false,
                message: 'variation failed (Code 2)',
            };
        }
    }
    async pollGenerationResult(generationId, resolve, reject, timeout) {
        const generationResult = await this.getGenerationResult(generationId);
        if (generationResult.success) {
            clearTimeout(timeout);
            resolve(generationResult);
        }
        else if (generationResult.message == 'PENDING') {
            setTimeout(() => {
                this.pollGenerationResult(generationId, resolve, reject, timeout);
            }, 1000);
        }
        else {
            clearTimeout(timeout);
            reject(generationResult);
        }
    }
    async getGenerationResult(generationId) {
        const generationResultUrl = `${this.baseUrl}/generations/${generationId}`;
        const response = await fetch(generationResultUrl, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${this.apiKey}`,
            },
        });
        const generationResultJson = await response.json();
        const pollingImageResponse = pollingImageGenerationResponseSchema.safeParse(generationResultJson);
        if (pollingImageResponse.success) {
            const generationResult = pollingImageResponse.data.generations_by_pk;
            if (generationResult.status == 'COMPLETE') {
                return {
                    success: true,
                    result: {
                        prompt: generationResult.prompt,
                        generationId: generationResult.id,
                        images: generationResult.generated_images.map((image) => ({
                            id: image.id,
                            url: image.url,
                        })),
                    },
                };
            }
            else if (generationResult.status == 'PENDING') {
                return {
                    success: false,
                    message: generationResult.status,
                };
            }
            else {
                return {
                    success: false,
                    message: 'generation failed (Code 1)',
                };
            }
        }
        else {
            console.log(pollingImageResponse.error);
            return {
                success: false,
                message: 'generation failed (Code 0)',
            };
        }
    }
    webhookHandler = async (req, res) => {
        console.log('Webhook received');
        const generationResultResponse = webhookResponseSchema.parse(req.body);
        console.log('Webhook response:');
        console.log(generationResultResponse);
        console.log('Api key:');
        console.log(generationResultResponse.data.object.apiKey);
        console.log('Right api key:');
        console.log(this.webhookApiKey);
        // Check api key
        if (this.webhookApiKey) {
            if (generationResultResponse.data.object.apiKey.webhookCallbackApiKey ==
                this.webhookApiKey) {
                console.log('Valid api key');
            }
            else {
                console.log('Invalid api key');
                throw new Error('Invalid api key');
            }
        }
        try {
            console.log('Trying to emit');
            if (generationResultResponse.type == 'image_generation.complete') {
                generationEventEmitter.emit(`generation-complete-${generationResultResponse.data.object.id}`, generationResultResponse.data.object);
            }
            if (generationResultResponse.type == 'post_processing.completed' ||
                generationResultResponse.type == 'post_processing.complete') {
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
export * from './types';
export * from './queryParamTypes';
export * from './validators';
