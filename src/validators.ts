import {
  GenerateImageQueryParams,
  PresetStyleAlchemy,
  PresetStyleDefault,
  PresetStylePhotoReal,
} from './queryParamTypes'

function isOneOf<T extends Record<string, unknown>>(
  value: any,
  obj: T
): value is T[keyof T] {
  return (Object.values(obj) as Array<any>).includes(value)
}

export class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

export const validateGenerateImageQueryParams = (
  params: GenerateImageQueryParams
) => {
  let validationResult = {
    valid: true,
    errors: [] as string[],
  }

  if (!params.alchemy && params.photoReal) {
    validationResult.valid = false
    validationResult.errors.push(' PhotoReal cannot be used without Alchemy')
  }

  // if (params.presetStyle) {
  //   if (params.alchemy && !isOneOf(params.presetStyle, PresetStyleAlchemy)) {
  //     validationResult.valid = false
  //     validationResult.errors.push(
  //       'PresetStyle must be one of PresetStyleAlchemy if alchemy is true'
  //     )
  //   } else if (
  //     params.photoReal &&
  //     !isOneOf(params.presetStyle, PresetStylePhotoReal)
  //   ) {
  //     validationResult.valid = false
  //     validationResult.errors.push(
  //       'PresetStyle must be one of PresetStylePhotoReal if photoReal is true'
  //     )
  //   } else if (!isOneOf(params.presetStyle, PresetStyleDefault)) {
  //     validationResult.valid = false
  //     validationResult.errors.push(
  //       'PresetStyle must be of PresetStyleDefault if neither alchemy nor photoReal is true'
  //     )
  //   }
  // }

  if (!params.alchemy) {
    if (params.alchemyStrength) {
      validationResult.valid = false
      validationResult.errors.push(
        'AlchemyStrength cannot be used if alchemy is false'
      )
    }
    if (params.contrastRatio) {
      validationResult.valid = false
      validationResult.errors.push(
        'ContrastRatio cannot be used if alchemy is false'
      )
    }
  }
  if (!params.photoReal) {
    if (params.photoRealStrength) {
      validationResult.valid = false
      validationResult.errors.push(
        'PhotoRealStrength cannot be used if photoReal is false'
      )
    }
  }

  return validationResult
}
