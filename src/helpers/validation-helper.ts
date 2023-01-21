import { ValidationChain, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors';
import { Request } from 'express';

export const validateRequest = async (
  req: Request,
  validations: ValidationChain[]
): Promise<void> => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }
};
