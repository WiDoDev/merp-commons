import { BaseError } from './base-error';

export class DatabaseConnectionError extends BaseError {
  constructor() {
    super({
      message: 'Error connecting to database',
      name: 'DatabaseConnectionError',
      code: 500,
    });
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}