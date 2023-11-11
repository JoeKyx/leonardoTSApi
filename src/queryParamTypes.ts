

export type ControlNetType = 'POSE'|'CANNY'|'DEPTH'

export type Element = {
  akUUID: string;
  weight?: number;
}

export const PresetStylePhotoReal = {
  CINEMATIC: 'CINEMATIC',
  CREATIVE: 'CREATIVE',
  VIBRANT: 'VIBRANT',
  NONE: 'NONE'
} as const;

export  const PresetStyleAlchemy = {
  ANIME: 'ANIME',
  CREATIVE: 'CREATIVE',
  DYNAMIC: 'DYNAMIC',
  ENVIRONMENT: 'ENVIRONMENT',
  GENERAL: 'GENERAL',
  ILLUSTRATION: 'ILLUSTRATION',
  PHOTOGRAPHY: 'PHOTOGRAPHY',
  RAYTRACED: 'RAYTRACED',
  RENDER_3D: 'RENDER_3D',
  SKETCH_BW: 'SKETCH_BW',
  SKETCH_COLOR: 'SKETCH_COLOR',
  NONE: 'NONE'
} as const;

export const PresetStyleDefault = {
  LEONARDO: 'LEONARDO',
  NONE: 'NONE'
} as const;

type PromptMagicVersion = 1 | 2;

export type Scheduler = 'KLMS' |'EULER_ANCESTRAL_DISCRETE' |'EULER_DISCRETE' |'DDIM' | 'DPM_SOLVER' |'PNDM' |'LEONARDO';

export type StableDiffusionVersion = 'v1_5'|'v2'

export type ImagePrompt = string; 

/**
 * Parameters for generating images.
 * 
 * @property {boolean} alchemy - Whether to use alchemy to generate images.
 * @property {contrastRatio} contrastRatio - Contrast Ratio to use with Alchemy.
 */
export type GenerateImageQueryParams =  {
  controlNet?: boolean;
  controlNetType?: ControlNetType;
  elements?: Element[];
  guidanceScale?: number;
  height?: number;
  highContrast?: boolean;
  highResolution?: boolean;
  imagePrompts?: ImagePrompt[];
  imagePromptWeight?: number;
  init_generation_image_id?: string;
  init_image_id?: string;
  init_strength?: number;
  modelid?: string;
  negative_prompt?: string;
  nsfw?: boolean;
  num_images?: number;
  num_inference_steps?: number;
  prompt: string;
  promptMagic?: boolean;
  promptMagicStrength?: number;
  promptMagicVersion?: PromptMagicVersion;
  public?: boolean;
  scheduler?: Scheduler;
  sd_version?:StableDiffusionVersion;
  seed?: number;
  tiling?: boolean;
  unzoom?: boolean;
  unzoomAmount?: number;
  upscaleRatio?: number;
  weighthing?: number;
  width?: number;
  photoReal?: boolean;
  photoRealStrength?: number;
  presetStyle?: typeof PresetStylePhotoReal | typeof PresetStyleAlchemy | typeof PresetStyleDefault;
  alchemy?: boolean;
  alchemyStrength?: number;
  contrastRatio?: number;
  expandedDomain?: boolean;
}


