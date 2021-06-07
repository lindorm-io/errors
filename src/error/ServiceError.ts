import { ExtendableError } from "./ExtendableError";
import { ExtendableErrorOptions } from "../typing";

interface Options extends ExtendableErrorOptions {
  statusCode: number;
}

export class ServiceError extends ExtendableError {
  public readonly statusCode: number;

  public constructor(message: string, options: Options) {
    super(message, options);

    this.statusCode = options.statusCode;
  }
}
