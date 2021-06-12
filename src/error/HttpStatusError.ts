import { LindormError } from "./LindormError";
import { ExtendableErrorOptions } from "./ExtendableError";

interface Options extends ExtendableErrorOptions {
  statusCode: number;
}

export abstract class HttpStatusError extends LindormError {
  public readonly statusCode: number;

  protected constructor(message: string, options: Options) {
    super(message, options);

    this.statusCode = options.statusCode;
  }
}
