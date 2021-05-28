import { ExtendableError } from "./ExtendableError";
import { IAPIErrorOptions } from "../typing";

export class APIError extends ExtendableError {
  public readonly statusCode: number;
  public readonly title: string | null;

  public constructor(message: string, options?: IAPIErrorOptions) {
    super(message, options);

    this.statusCode = options?.statusCode || 500;
    this.title = options?.title || null;
  }
}
