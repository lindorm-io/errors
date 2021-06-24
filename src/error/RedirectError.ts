import { LindormError } from "./LindormError";
import { ExtendableErrorOptions } from "./ExtendableError";

interface Options extends ExtendableErrorOptions {
  code: string;
  description: string;
  redirect: string;
  state?: string;
  uri?: string;
}

export class RedirectError extends LindormError {
  public readonly code: string;
  public readonly description: string;
  public readonly redirect: string;
  public readonly state: string | null;
  public readonly uri: string | null;

  public constructor(message: string, options: Options) {
    super(message, options);

    this.code = options.code;
    this.description = options.description;
    this.redirect = options.redirect;
    this.state = options.state || null;
    this.uri = options.uri || null;
  }
}
