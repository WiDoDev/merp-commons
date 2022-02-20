export interface SerializedError {
  message: string;
  name: string;
  field?: string;
}
export interface BaseErrorInterface {
  code: number;
  name: string;
  message: string;
  field?: string;
  serializeErrors(): SerializedError[];
}

export interface BaseErrorConstructorParams {
  name: string;
  message: string;
  field?: string;
  code?: number;
}

export class BaseError extends Error implements BaseErrorInterface {
  message: string;
  name: string;
  code: number;
  field: string;
  constructor(params: BaseErrorConstructorParams) {
    super(params.message);
    this.message = params.message;
    this.name = params.name;
    this.code = params.code || 400;
    this.field = params.field || '';
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  serializeErrors(): SerializedError[] {
    return [{ message: this.message, name: this.name, field: this.field }];
  }
}
