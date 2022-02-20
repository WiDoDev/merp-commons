import { BaseError } from './base-error';

export class NotFoundError extends BaseError {
  constructor() {
    super({
      message: 'Not found',
      name: 'NotFoundError',
      code: 404,
    });
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

