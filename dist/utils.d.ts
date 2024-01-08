/// <reference types="node" />
/// <reference types="node" />
import { Readable } from 'stream';
import { ImageExtension } from './types.js';
export declare const getErrorMessage: (error: unknown) => string;
export declare function bufferToStream(buffer: Buffer): Readable;
export declare const downloadImage: (url: string, path: string) => Promise<void>;
export declare const saveFileTemporarily: (url: string, fileExtension: ImageExtension) => Promise<string>;
//# sourceMappingURL=utils.d.ts.map