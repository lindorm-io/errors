import { ServiceError } from "../private/ServiceError";
import { ExtendableErrorOptions } from "../../typing";
import { HttpClientError } from "../../enum";

interface Options extends ExtendableErrorOptions {
  statusCode?: number;
}

export class ClientError extends ServiceError {
  public constructor(message: string, options?: Options) {
    super(message, { ...(options || {}), statusCode: options?.statusCode || 400 });
  }

  public static get StatusCode(): typeof HttpClientError {
    return HttpClientError;
  }
}
