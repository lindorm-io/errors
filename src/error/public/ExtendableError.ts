import { cloneDeep, isFunction } from "lodash";
import { DeveloperInfo, ExtendableErrorOptions, PublicInfo } from "../../typing";

export abstract class ExtendableError extends Error {
  public readonly errors: Array<ExtendableError | Error>;
  public readonly developer: DeveloperInfo & { trace: Array<string> };
  public readonly public: PublicInfo;

  protected constructor(message: string, options: ExtendableErrorOptions = {}) {
    super(message);

    this.name = this.constructor.name;

    const inherited =
      options.error && options.error instanceof ExtendableError
        ? {
            errors: options.error.errors ? cloneDeep(options.error.errors) : undefined,
            developer: {
              debug: options.error.developer.debug,
              details: options.error.developer.details,
              trace: options.error.developer.trace ? cloneDeep(options.error.developer.trace) : undefined,
            },
            public: {
              data: options.error.public.data,
              description: options.error.public.description,
              title: options.error.public.title,
            },
          }
        : null;

    this.errors = inherited?.errors || [];

    this.developer = {
      debug: options.developer?.debug || inherited?.developer.debug,
      details: options.developer?.details || inherited?.developer.details,
      trace: inherited?.developer.trace || [],
    };

    this.public = {
      data: options.public?.data || inherited?.public.data,
      description: options.public?.description || inherited?.public.description,
      title: options.public?.title || inherited?.public.title,
    };

    if (options.error) {
      this.errors.push(options.error);
      this.developer.trace.push(`${options.error.constructor.name}: ${options.error.message}`);
    }

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
