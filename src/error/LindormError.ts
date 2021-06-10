import { ExtendableError, ExtendableErrorOptions } from "./ExtendableError";

export class LindormError extends ExtendableError {
  public constructor(message: string, options?: ExtendableErrorOptions) {
    super(message, options);
  }
}
