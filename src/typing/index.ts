export interface DeveloperInfo {
  debug?: Record<string, any>;
  details?: string;
}

export interface PublicInfo {
  data?: Record<string, any>;
  description?: string;
  title?: string;
}

export interface ExtendableErrorOptions {
  error?: Error;
  developer?: DeveloperInfo;
  public?: PublicInfo;
}
