import { PresetStyleAlchemy, PresetStyleDefault, PresetStylePhotoReal, Scheduler, StableDiffusionVersion } from "./queryParamTypes";

export type GenerateImageResponse = {
  apiCreditCost: number;
  generationId: string;
  generatedImages: GeneratedImage[];
  modelId: string;
  prompt: string;
  negativePrompt: string;
  imageHeight: number;
  imageWidth: number;
  inferenceSteps: number;
  ssed: number;
  public: boolean;
  scheduler: Scheduler;
  sdVersion: StableDiffusionVersion;
  status: string;
  presetStyle: typeof PresetStylePhotoReal | typeof PresetStyleAlchemy | typeof PresetStyleDefault;
  initStrength: number;
  guidanceScale: number;
  createdAt: Date;
  promptMagic: boolean;
  promptMagicVersion: number | null;
  promptMagicStrength: number | null;
  photoReal: boolean;
  photoRealStrength: number | null;
  generationElements: string[];
}

type GeneratedImage = {
  url: string;
  nsfw: boolean;
  id: string;
  likeCount: number;
  generatedImageVariationGenerics: string[];
}


  //87defef5-3e35-4ea6-b5bb-bebbce4e6df3