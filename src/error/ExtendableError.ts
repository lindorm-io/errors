import { isFunction } from "lodash";
import { ExtendableErrorOptions } from "../typing";

export abstract class ExtendableError extends Error {
  public readonly debug: Record<string, any>;
  public readonly details: string | null;
  public readonly errorCode: string | null;
  public readonly originalError?: Error | null;
  public readonly publicData?: Record<string, any>;

  protected constructor(message: string, options?: ExtendableErrorOptions) {
    super(message);

    this.name = this.constructor.name;
    this.debug = options?.debug || {};
    this.details = options?.details || null;
    this.errorCode = options?.errorCode || null;
    this.publicData = options?.publicData || {};
    this.originalError = options?.originalError || null;

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
