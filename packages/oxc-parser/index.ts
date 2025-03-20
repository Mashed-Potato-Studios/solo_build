// packages/oxc-parser/index.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
import oxc from 'oxc-parser';
import { BuildConfig, ParseResult, SourceFile } from '../../types';
import consola from 'consola';

// Define a more flexible error interface to handle various error formats
interface FlexibleOxcError {
  message: string;
  [key: string]: any;
}

export class OxcCodeParser {
  private config: BuildConfig;
  
  constructor(config: BuildConfig) {
    this.config = config;
  }
  
  async parseFiles(): Promise<ParseResult> {
    consola.info('Parsing source files with oxc...');
    
    const files: SourceFile[] = [];
    const ast: Record<string, any> = {};
    const errors: Record<string, Error[]> = {};
    
    // Find all source files
    const patterns = this.config.include.map(p => path.join(this.config.sourceDir, p));
    const excludePatterns = this.config.exclude.map(p => path.join(this.config.sourceDir, p));
    
    const filePaths = await glob(patterns, {
      ignore: excludePatterns,
      cwd: this.config.projectRoot
    });
    
    // Parse each file
    for (const filePath of filePaths) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const file: SourceFile = { path: filePath, content };
        
        // Parse the file using oxc parser
        const result = await oxc.parseAsync(filePath, content);
        
        if (result.errors.length > 0) {
          const fileErrors = result.errors.map((err: FlexibleOxcError) => {
            // Handle different error structure formats
            let line = 0;
            let column = 0;
            
            if (err.span && err.span.start) {
              line = err.span.start.line;
              column = err.span.start.column;
            } else if (err.location && err.location.start) {
              line = err.location.start.line;
              column = err.location.start.column;
            }
            
            return new Error(`${err.message} at line ${line}:${column}`);
          });
          
          errors[filePath] = fileErrors;
          consola.warn(`Found ${fileErrors.length} errors while parsing ${filePath}`);
        }
        
        // Add required properties to match ASTNode interface if needed
        const program = result.program as any;
        const adaptedAst = {
          ...program,
          type: program.type || 'Program',
          start: 0,
          end: content.length,
          loc: program.loc || {
            start: { line: 1, column: 0 },
            end: { 
              line: content.split('\n').length, 
              column: content.split('\n').pop()?.length || 0 
            }
          }
        };
        
        file.ast = adaptedAst;
        ast[filePath] = adaptedAst;
        files.push(file);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        consola.error(`Error parsing ${filePath}:`, error.message);
        errors[filePath] = [error];
      }
    }
    
    consola.success(`Parsed ${files.length} files, ${Object.keys(errors).length} files with errors`);
    
    return { files, ast, errors };
  }
}
