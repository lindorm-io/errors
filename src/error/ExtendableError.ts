import { cloneDeep, isFunction } from "lodash";
import { v4 as uuid } from "uuid";

export interface IExtendableError {
  id: string;
  code: string | null;
  data: Record<string, any>;
  debug: Record<string, any>;
  description: string | null;
  errors: Array<Error>;
  message: string;
  name: string;
  stack?: any;
  title: string | null;
  trace: Array<string>;
}

export interface ExtendableErrorOptions {
  code?: string;
  data?: Record<string, any>;
  debug?: Record<string, any>;
  description?: string;
  error?: Error;
  title?: string;
}

export abstract class ExtendableError extends Error implements IExtendableError {
  public readonly id: string;
  public readonly code: string | null;
  public readonly data: Record<string, any>;
  public readonly debug: Record<string, any>;
  public readonly description: string | null;
  public readonly errors: Array<Error>;
  public readonly title: string | null;
  public readonly trace: Array<string>;

  protected constructor(message: string, options: ExtendableErrorOptions = {}) {
    super(message);

    const inherited: IExtendableError | null =
      options.error && options.error instanceof ExtendableError ? options.error.toJSON() : null;

    this.id = inherited?.id || uuid();
    this.code = options.code || inherited?.code || null;
    this.data = options.data || inherited?.data || {};
    this.debug = options.debug || inherited?.debug || {};
    this.description = options.description || inherited?.description || null;
    this.errors = inherited?.errors || [];
    this.name = this.constructor.name;
    this.title = options.title || inherited?.title || null;
    this.trace = inherited?.trace || [];

    if (options.error instanceof Error) {
      const prefix = options.error.constructor?.name ? `${options.error.constructor?.name}: ` : "Error";

      this.errors.push(options.error);
      this.trace.push(`${prefix}${options.error.message}`);
    }

    if (isFunction(Error.captureStackTrace)) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  public toJSON(): IExtendableError {
    return {
      id: this.id,
      code: this.code,
      data: cloneDeep(this.data),
      debug: cloneDeep(this.debug),
      description: this.description,
      errors: cloneDeep(this.errors),
      message: this.message,
      name: this.name,
      stack: this.stack,
      title: this.title,
      trace: cloneDeep(this.trace),
    };
  }
}
