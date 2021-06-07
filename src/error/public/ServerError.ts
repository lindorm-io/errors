import { ServiceError } from "../private/ServiceError";
import { ExtendableErrorOptions } from "../../typing";
import { HttpServerError } from "../../enum";

interface Options extends ExtendableErrorOptions {
  statusCode?: number;
}

export class ServerError extends ServiceError {
  public constructor(message: string, options?: Options) {
    super(message, { ...(options || {}), statusCode: options?.statusCode || 500 });
  }

  public static get StatusCode(): typeof HttpServerError {
    return HttpServerError;
  }
}
