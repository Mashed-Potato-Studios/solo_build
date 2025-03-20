// Generated code
// Application configuration interface
export interface Config {
  appName: string;
  version: string;
  debug: boolean;
  settings?: Record<string, any>;
}

// API response interface
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: number;
}

// Logger levels
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}