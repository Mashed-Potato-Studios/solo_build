---
title: Parser Component
description: Learn about the Parser component that handles parsing source files and generating Abstract Syntax Trees (ASTs)
---

# Parser

The Parser is a fundamental component of the Solo Build system that transforms your source code into an Abstract Syntax Tree (AST), which is used by other components for analysis, transformation, and code generation.

## Overview

The Parser reads your JavaScript and TypeScript source files and converts them into a structured representation that can be easily analyzed and manipulated. Solo Build offers two parser implementations:

1. **Babel-based Parser**: A robust parser using the Babel ecosystem
2. **oxc.rs-based Parser**: A high-performance Rust-based parser (experimental)

## Features

### Language Support

The Parser supports a wide range of JavaScript and TypeScript features:

- **ECMAScript**: Full support for modern JavaScript syntax (ES2015-2023)
- **TypeScript**: Complete TypeScript language support, including type annotations
- **JSX/TSX**: Support for React's JSX syntax and TypeScript's TSX
- **Flow**: Optional support for Flow type annotations
- **Decorators**: Support for both legacy and stage 3 decorators

### Performance Optimizations

The Parser is optimized for performance:

- **Incremental Parsing**: Only re-parses files that have changed
- **Parallel Processing**: Parses multiple files concurrently
- **Caching**: Caches ASTs to avoid redundant parsing
- **Memory Efficiency**: Optimized memory usage for large codebases

### Error Recovery

The Parser includes robust error recovery mechanisms:

- **Syntax Error Recovery**: Continues parsing even when syntax errors are encountered
- **Detailed Error Reporting**: Provides clear and actionable error messages
- **Source Maps Integration**: Maintains source map information for accurate error locations

## Usage

### Basic Usage

The Parser is automatically used when you run the build command:

```bash
npx solo-build run
```

### Configuration

You can configure the Parser in your `solo-build.config.js` file:

```javascript
module.exports = {
  // ... other configuration options
  parser: {
    implementation: 'babel', // or 'oxc'
    sourceType: 'module', // or 'script'
    plugins: ['typescript', 'jsx', 'decorators-legacy'],
    parserOptions: {
      // Additional parser-specific options
      decoratorsBeforeExport: true,
      allowImportExportEverywhere: true
    }
  }
};
```

### Programmatic Usage

You can also use the Parser programmatically in your own code:

```typescript
import { Parser } from '@solo-build/parser';

// Create a parser instance
const parser = new Parser({
  implementation: 'babel',
  plugins: ['typescript']
});

// Parse a file
const result = await parser.parseFile('src/index.ts');

// Or parse source code directly
const sourceCode = `
  function hello(name: string): string {
    return \`Hello, \${name}!\`;
  }
`;
const result = parser.parseSource(sourceCode, {
  filePath: 'src/hello.ts'
});

// Access the AST
console.log(result.ast);
```

## API Reference

### ParseResult Interface

The Parser returns a `ParseResult` object with the following structure:

```typescript
interface ParseResult {
  filePath: string;
  ast: AST;
  errors: ParseError[];
  dependencies: string[];
  sourceType: 'module' | 'script';
  sourceMap?: SourceMap;
}

interface ParseError {
  message: string;
  line: number;
  column: number;
  code?: string;
}
```

### AST Structure

The AST follows the [ESTree specification](https://github.com/estree/estree) with additional TypeScript-specific nodes. For a detailed reference of all node types, see the [AST Explorer](https://astexplorer.net/).

## Integration with Other Components

The Parser works closely with other Solo Build components:

- **Analyzer**: Provides ASTs to the Analyzer for code analysis
- **Transformer**: Supplies ASTs to the Transformer for code modifications
- **Generator**: Feeds ASTs to the Generator for output file creation

## Examples

### Parsing a TypeScript File

```typescript
import { Parser } from '@solo-build/parser';

const parser = new Parser({
  plugins: ['typescript']
});

const result = await parser.parseFile('src/components/Button.tsx');
console.log(result.ast);
```

### Handling Parse Errors

```typescript
import { Parser } from '@solo-build/parser';

const parser = new Parser();

try {
  const result = await parser.parseFile('src/index.js');
  
  if (result.errors.length > 0) {
    console.warn('Parsed with errors:');
    result.errors.forEach(error => {
      console.warn(`${error.line}:${error.column} - ${error.message}`);
    });
  }
  
  // Continue with the AST
  console.log(result.ast);
} catch (error) {
  console.error('Failed to parse:', error);
}
```

## Best Practices

1. **Choose the Right Implementation**: Use the Babel parser for compatibility, or the oxc parser for performance
2. **Configure Only What You Need**: Enable only the plugins you actually need to improve parsing speed
3. **Handle Parse Errors Gracefully**: Always check for and handle parsing errors
4. **Cache ASTs When Possible**: If you're repeatedly analyzing the same files, cache the ASTs
5. **Use Source Maps**: Enable source maps for better error reporting and debugging
