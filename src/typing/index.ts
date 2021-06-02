export interface ExtendableErrorOptions {
  debug?: Record<string, any>;
  details?: string;
  errorCode?: string;
  originalError?: Error;
  publicData?: Record<string, any>;
}

export interface APIErrorOptions extends ExtendableErrorOptions {
  statusCode?: number;
  title?: string;
}
