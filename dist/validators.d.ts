import { GenerateImageQueryParams } from './queryParamTypes.js';
export declare class ValidationError extends Error {
    constructor(message: string);
}
export declare const validateGenerateImageQueryParams: (params: GenerateImageQueryParams) => {
    valid: boolean;
    errors: string[];
};
//# sourceMappingURL=validators.d.ts.map