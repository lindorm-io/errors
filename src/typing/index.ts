export interface IExtendableErrorOptions {
  debug?: Record<string, any>;
  details?: string;
  errorCode?: string;
  publicData?: Record<string, any>;
}

export interface IAPIErrorOptions extends IExtendableErrorOptions {
  statusCode?: number;
  title?: string;
}
