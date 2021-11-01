import { msConfig } from '../config';

export interface MSEventInterface {
  getEmitter: () => string;
  getSubject: () => string;
  getData: () => unknown;
}

export interface EventData<T> {
  emitter: string;
  data: T;
}

export abstract class MSEvent implements MSEventInterface {
  private emitter: string;
  private subject: string;

  constructor(subject: string) {
    this.emitter = msConfig.msSignature;
    this.subject = subject;
  }

  public getEmitter(): string {
    return this.emitter;
  }
  public getSubject(): string {
    return this.subject;
  }

  abstract getData(): unknown;
}
