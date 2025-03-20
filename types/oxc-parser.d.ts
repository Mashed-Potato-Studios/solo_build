// Type definitions for oxc-parser
declare module 'oxc-parser' {
  export interface SourceLocation {
    start: {
      line: number;
      column: number;
      index?: number;
    };
    end: {
      line: number;
      column: number;
      index?: number;
    };
  }

  export interface OxcError {
    message: string;
    kind?: string;
    location?: {
      start: {
        line: number;
        column: number;
      };
      end: {
        line: number;
        column: number;
      };
    };
    span?: {
      start: {
        line: number;
        column: number;
      };
      end: {
        line: number;
        column: number;
      };
    };
  }

  export interface Program {
    type?: string;
    body: any[];
    sourceType?: string;
    loc?: SourceLocation;
    [key: string]: any;
  }

  export interface ParseResult {
    program: Program;
    comments: any[];
    errors: OxcError[];
    module?: {
      imports: any[];
      exports: any[];
      importMetas: any[];
    };
  }

  export function parseSync(filename: string, code: string): ParseResult;
  export function parseAsync(filename: string, code: string): Promise<ParseResult>;

  const oxc: {
    parseSync: typeof parseSync;
    parseAsync: typeof parseAsync;
  };

  export default oxc;
}
