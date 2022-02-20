import { BaseError } from './base-error';

export class NotAuthorizedError extends BaseError {
  constructor() {
    super({
      message: 'Not Authorized',
      name: 'NotAuthorizedError',
      code: 401,
    });
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}
