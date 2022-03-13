import { BaseError } from './base-error';

export class MultiTenantAccessError extends BaseError {
  constructor() {
    super({
      message: 'Not Authorized to access this tenant',
      name: 'MutltiTenantAccessError',
      code: 401,
    });
    Object.setPrototypeOf(this, MultiTenantAccessError.prototype);
  }
}