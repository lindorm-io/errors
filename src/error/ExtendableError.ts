import { isFunction } from "lodash";
import { IExtendableErrorOptions } from "../typing";

export abstract class ExtendableError extends Error {
  readonly debug: Record<string, any>;
  readonly details: string;
  readonly errorCode: string;
  readonly publicData?: Record<string, any>;

  protected constructor(message: string, options?: IExtendableErrorOptions) {
    super(message);

    this.name = this.constructor.name;
    this.debug = options?.debug || {};
    this.details = options?.details || null;
    this.errorCode = options?.errorCode || null;
    this.publicData = options?.publicData || {};

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
