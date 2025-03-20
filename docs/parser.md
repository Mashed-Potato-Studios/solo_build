# Parser Component

The Parser component is responsible for parsing source files into Abstract Syntax Trees (ASTs) that can be analyzed and transformed by other components of the build system.

## Overview

The Parser takes source files and converts them into ASTs, which are tree representations of the source code structure. It supports both JavaScript and TypeScript files and can use different parsing engines (Babel or oxc.rs).

## API

### Constructor

```typescript
constructor(config: BuildConfig)
```

Creates a new Parser instance with the specified configuration.

#### Parameters

- `config`: The build configuration object

### Methods

#### parse

```typescript
async parse(files: string[]): Promise<Record<string, any>>
```

Parses an array of file paths and returns their ASTs.

##### Parameters

- `files`: An array of file paths to parse

##### Returns

A promise that resolves to a record of file paths to their AST

#### parseFile

```typescript
async parseFile(filePath: string): Promise<any>
```

Parses a single file and returns its AST.

##### Parameters

- `filePath`: The path to the file to parse

##### Returns

A promise that resolves to the AST of the file

#### parseWithBabel

```typescript
async parseWithBabel(filePath: string, content: string): Promise<any>
```

Parses a file using Babel.

##### Parameters

- `filePath`: The path to the file
- `content`: The content of the file

##### Returns

A promise that resolves to the AST of the file

#### parseWithOxc

```typescript
async parseWithOxc(filePath: string, content: string): Promise<any>
```

Parses a file using oxc.rs (when available).

##### Parameters

- `filePath`: The path to the file
- `content`: The content of the file

##### Returns

A promise that resolves to the AST of the file

## Configuration Options

The Parser component uses the following configuration options:

- `parser`: The parser to use ('babel' or 'oxc')
- `parserOptions`: Options to pass to the parser
- `include`: Glob patterns for files to include
- `exclude`: Glob patterns for files to exclude

## Example Usage

```typescript
import { Parser } from '../packages/parser';
import { BuildConfig } from '../types';
import { glob } from 'glob';
import { resolve } from 'path';

// Create a configuration
const config: BuildConfig = {
  projectRoot: '/path/to/project',
  sourceDir: 'src',
  include: ['**/*.ts', '**/*.js'],
  exclude: ['**/*.test.ts', 'node_modules/**'],
  parser: 'babel',
  parserOptions: {
    // Babel parser options
  }
};

// Find files to parse
const files = glob.sync(`${config.sourceDir}/**/*.{ts,js}`, {
  cwd: config.projectRoot,
  ignore: config.exclude
}).map(file => resolve(config.projectRoot, file));

// Parse files
const parser = new Parser(config);
const ast = await parser.parse(files);

console.log(`Parsed ${Object.keys(ast).length} files`);
```

## Babel Parser

The Babel parser is the default parser used by the build system. It supports both JavaScript and TypeScript files and provides a rich AST that can be easily analyzed and transformed.

### Babel Parser Options

```typescript
interface BabelParserOptions {
  sourceType?: 'script' | 'module';
  plugins?: string[];
  allowImportExportEverywhere?: boolean;
  allowReturnOutsideFunction?: boolean;
  allowSuperOutsideMethod?: boolean;
  allowUndeclaredExports?: boolean;
  errorRecovery?: boolean;
  tokens?: boolean;
}
```

## oxc.rs Parser

The oxc.rs parser is an optional parser that can be used for improved performance. It is a Rust-based parser that is significantly faster than Babel, but may not support all the features of Babel.

### oxc.rs Parser Options

```typescript
interface OxcParserOptions {
  sourceType?: 'script' | 'module';
  target?: 'es2015' | 'es2016' | 'es2017' | 'es2018' | 'es2019' | 'es2020' | 'es2021' | 'es2022';
  jsx?: boolean;
}
```

## Error Handling

The Parser handles errors during the parsing process and provides detailed error messages. If a file fails to parse, the error is logged, but the parsing process continues for other files.

## Performance Considerations

- Parsing can be CPU-intensive for large files
- The Parser processes files in parallel for better performance
- The oxc.rs parser is significantly faster than Babel, but may not support all features
- Parsing TypeScript files is generally slower than parsing JavaScript files

## Future Improvements

- Improve error recovery for better partial parsing
- Add support for more parsers
- Improve performance for large files
- Add support for incremental parsing
