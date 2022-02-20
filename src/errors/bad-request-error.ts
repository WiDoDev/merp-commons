import { BaseError } from './base-error';

export class BadRequestError extends BaseError {
  constructor() {
    super({
      message: 'Bad Request',
      name: 'BadRequestError',
      code: 400,
    });
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
