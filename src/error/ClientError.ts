import { ServiceError } from "./ServiceError";
import { ExtendableErrorOptions } from "../typing";

interface Options extends ExtendableErrorOptions {
  statusCode?: number;
}

export class ClientError extends ServiceError {
  public constructor(message: string, options?: Options) {
    super(message, { ...(options || {}), statusCode: options?.statusCode || 400 });
  }
}
