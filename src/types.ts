type ValidationResult = ValidValidationResult | InvalidValidationResult;

type ValidValidationResult = {
  valid: true;
}

type InvalidValidationResult = {
  valid: false;
  errors: string[];
}