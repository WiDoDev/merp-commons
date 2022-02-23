import { BaseError } from './base-error';

export class AutenticationTokenError extends BaseError {
  constructor() {
    super({
      message: 'Authentication token error',
      name: 'AutenticationTokenError',
      code: 401,
    });
    Object.setPrototypeOf(this, AutenticationTokenError.prototype);
  }
}
