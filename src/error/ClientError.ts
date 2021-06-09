import { HttpStatusError } from "./HttpStatusError";
import { ExtendableErrorOptions } from "./ExtendableError";
import { ClientErrorStatus } from "../enum";

interface Options extends ExtendableErrorOptions {
  statusCode?: number;
}

export class ClientError extends HttpStatusError {
  public constructor(message: string, options?: Options) {
    super(message, { ...(options || {}), statusCode: options?.statusCode || 400 });
  }

  public static get StatusCode(): typeof ClientErrorStatus {
    return ClientErrorStatus;
  }
}
