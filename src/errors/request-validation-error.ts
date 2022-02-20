import { ValidationError } from 'express-validator';
import { BaseError, SerializedError } from './base-error';

export class RequestValidationError extends BaseError {
  constructor(public errors: ValidationError[]) {
    super({
      message: 'Invalid request parameters',
      name: 'RequestValidationError',
      code: 400,
    });
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
  serializeErrors(): SerializedError[] {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param, name:this.name };
    });
  }
}


