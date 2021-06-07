import { ExtendableError } from "./ExtendableError";
import { ExtendableErrorOptions } from "../typing";

interface Options extends ExtendableErrorOptions {
  statusCode: number;
}

export abstract class HttpStatusError extends ExtendableError {
  public readonly statusCode: number;

  protected constructor(message: string, options: Options) {
    super(message, options);

    this.statusCode = options.statusCode;
  }
}
