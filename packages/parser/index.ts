// packages/parser/index.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';
import { parse, ParserOptions } from '@babel/parser';
import { BuildConfig, ParseResult, SourceFile, ASTNode } from './types';
import consola from 'consola';

export class Parser {
  private config: BuildConfig;
  
  constructor(config: BuildConfig) {
    this.config = config;
  }
  
  async parseFiles(): Promise<ParseResult> {
    consola.info('Parsing source files with Babel...');
    
    const files: SourceFile[] = [];
    const ast: Record<string, ASTNode> = {};
    const errors: Record<string, Error[]> = {};
    
    try {
      // Find all source files
      const sourceDir = this.config.sourceDir;
      const patterns = this.config.include.map((p: string) => path.join(this.config.sourceDir, p));
      const ignorePatterns = this.config.exclude.map((p: string) => path.join(this.config.sourceDir, p));
      
      const filePaths = await glob(patterns, {
        cwd: this.config.projectRoot,
        ignore: ignorePatterns,
        absolute: true
      });
      
      // Parse each file
      for (const filePath of filePaths) {
        try {
          const content = await fs.readFile(filePath, 'utf8');
          
          const file: SourceFile = {
            path: filePath,
            content,
            ast: undefined
          };
          
          // Parse based on file extension
          const parseOptions: ParserOptions = {
            sourceType: 'module',
            plugins: [
              'jsx',
              'typescript',
              'decorators-legacy',
              'classProperties'
            ]
          };
          
          const parsedAst = parse(content, parseOptions);
          
          // Ensure we have non-null values for the AST node
          const startIndex = typeof parsedAst.loc?.start.index === 'number' ? parsedAst.loc.start.index : 0;
          const endIndex = typeof parsedAst.loc?.end.index === 'number' ? parsedAst.loc.end.index : 0;
          const startLine = typeof parsedAst.loc?.start.line === 'number' ? parsedAst.loc.start.line : 0;
          const startColumn = typeof parsedAst.loc?.start.column === 'number' ? parsedAst.loc.start.column : 0;
          const endLine = typeof parsedAst.loc?.end.line === 'number' ? parsedAst.loc.end.line : 0;
          const endColumn = typeof parsedAst.loc?.end.column === 'number' ? parsedAst.loc.end.column : 0;
          
          // Convert to ASTNode type to match the expected interface
          const astNode: ASTNode = {
            type: parsedAst.type,
            start: startIndex,
            end: endIndex,
            loc: {
              start: { 
                line: startLine, 
                column: startColumn 
              },
              end: { 
                line: endLine, 
                column: endColumn 
              }
            },
            // Spread the rest of the properties except 'type', 'start', 'end', and 'loc'
            // which we've already explicitly set
            ...Object.entries(parsedAst).reduce((acc, [key, value]) => {
              if (key !== 'type' && key !== 'start' && key !== 'end' && key !== 'loc') {
                acc[key] = value;
              }
              return acc;
            }, {} as Record<string, any>)
          };
          
          file.ast = astNode;
          ast[filePath] = astNode;
          files.push(file);
        } catch (err: unknown) {
          const error = err instanceof Error ? err : new Error(String(err));
          consola.error(`Error parsing ${filePath}:`, error);
          
          if (!errors[filePath]) {
            errors[filePath] = [];
          }
          
          errors[filePath].push(error);
        }
      }
      
      consola.success(`Parsed ${files.length} files, ${Object.keys(errors).length} files with errors`);
      return { files, ast, errors };
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error(String(err));
      consola.error('Error parsing files:', error);
      throw error;
    }
  }
}