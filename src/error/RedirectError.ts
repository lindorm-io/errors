import { LindormError } from "./LindormError";
import { ExtendableErrorOptions } from "./ExtendableError";

interface Options extends ExtendableErrorOptions {
  redirect: string;
}

export class RedirectError extends LindormError {
  public readonly redirect: string;

  public constructor(message: string, options: Options) {
    super(message, options);

    this.redirect = options.redirect;
  }
}
