import { cloneDeep, isFunction } from "lodash";
import { DeveloperInfo, ExtendableErrorOptions, PublicInfo } from "../../typing";

export abstract class ExtendableError extends Error {
  public readonly errors: Array<Error>;
  public readonly developer: DeveloperInfo & { trace: Array<string> };
  public readonly public: PublicInfo;

  protected constructor(message: string, options: ExtendableErrorOptions = {}) {
    super(message);

    this.name = this.constructor.name;
    this.errors = [];

    this.developer = {
      debug: options.developer?.debug,
      details: options.developer?.details,
      trace: [],
    };

    this.public = {
      data: options.public?.data,
      description: options.public?.description,
      title: options.public?.title,
    };

    if (options.error) {
      if (options.error instanceof ExtendableError) {
        this.errors = cloneDeep(options.error.errors);
        this.developer.trace = cloneDeep(options.error.developer.trace);
      }

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
