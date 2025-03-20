---
title: Generator Component
description: Learn about the Generator component that handles code generation, output management, and performance optimizations
---

# Generator

The Generator is a core component of the Solo Build system that produces the final output files from transformed Abstract Syntax Trees (ASTs).

## Overview

The Generator takes the ASTs that have been processed by the Transformer and converts them back into code files. It handles various output formats, source maps, and can apply final optimizations before writing files to disk.

## Features

### Code Generation

The Generator supports various code generation options:

- **Multiple Output Formats**: Generate CommonJS, ES Modules, UMD, or other formats
- **Pretty Printing**: Format code with configurable indentation and style
- **Minification**: Reduce file size by removing whitespace and shortening names
- **Banner/Footer**: Add custom text to the beginning or end of generated files
- **Source Maps**: Generate inline or external source maps for debugging

### Output Management

The Generator provides comprehensive output management:

- **File Organization**: Control the structure of output directories
- **File Naming**: Configure output file names and extensions
- **Asset Handling**: Copy or transform non-code assets (images, styles, etc.)
- **Manifest Generation**: Create manifest files listing all generated assets
- **Clean Output**: Optionally clean output directory before generation

### Performance Optimizations

The Generator includes performance optimizations:

- **Incremental Generation**: Only regenerate files that have changed
- **Parallel Processing**: Generate multiple files concurrently
- **Caching**: Cache generated code to avoid redundant work
- **Chunk Optimization**: Optimize code splitting and chunking

## Usage

### Basic Usage

The Generator is automatically used when you run the build command:

```bash
npx solo-build run
```

### Configuration

You can configure the Generator in your `solo-build.config.js` file:

```javascript
module.exports = {
  // ... other configuration options
  generator: {
    outDir: 'dist',
    format: 'esm',          // 'cjs', 'esm', 'umd'
    minify: true,
    sourceMaps: true,
    sourceMapType: 'external', // 'inline', 'external'
    banner: '/* My Library v1.0.0 */',
    footer: '/* Copyright 2023 */',
    clean: true,
    assets: {
      patterns: ['public/**/*'],
      output: 'assets'
    }
  }
};
```

### Multiple Output Formats

You can generate multiple output formats:

```javascript
module.exports = {
  // ... other configuration options
  generator: {
    formats: [
      {
        format: 'cjs',
        outDir: 'dist/cjs',
        minify: false
      },
      {
        format: 'esm',
        outDir: 'dist/esm',
        minify: false
      },
      {
        format: 'umd',
        outDir: 'dist/umd',
        minify: true,
        name: 'MyLibrary'  // Global name for UMD build
      }
    ]
  }
};
```

### Programmatic Usage

You can also use the Generator programmatically in your own code:

```typescript
import { Generator } from '@solo-build/generator';
import { Transformer } from '@solo-build/transformer';
import { Parser } from '@solo-build/parser';

// Create a generator instance
const generator = new Generator({
  outDir: 'dist',
  format: 'esm',
  sourceMaps: true
});

// Parse and transform a file
const parser = new Parser();
const transformer = new Transformer();

const parseResult = await parser.parseFile('src/index.ts');
const transformResult = transformer.transform(parseResult.ast, {
  filePath: 'src/index.ts',
  sourceMap: parseResult.sourceMap
});

// Generate output file
const result = await generator.generate(transformResult.ast, {
  filePath: 'src/index.ts',
  originalSource: parseResult.source,
  sourceMap: transformResult.map
});

console.log(`Generated file: ${result.filePath}`);
```

## API Reference

### GenerateResult Interface

The Generator returns a `GenerateResult` object with the following structure:

```typescript
interface GenerateResult {
  filePath: string;
  code: string;
  map?: SourceMap;
  size: number;
  originalSize: number;
  compressionRatio: number;
  dependencies: string[];
  assets: Asset[];
}

interface Asset {
  source: string;
  destination: string;
  size: number;
}
```

### GeneratorOptions Interface

The Generator accepts various options:

```typescript
interface GeneratorOptions {
  // Output options
  outDir: string;
  format: 'cjs' | 'esm' | 'umd' | 'iife';
  name?: string;  // Global name for UMD/IIFE formats
  
  // Code style
  minify: boolean;
  indent: {
    style: 'space' | 'tab';
    size: number;
  };
  lineEnding: 'lf' | 'crlf';
  
  // Source maps
  sourceMaps: boolean;
  sourceMapType: 'inline' | 'external';
  
  // Content additions
  banner?: string;
  footer?: string;
  
  // File management
  clean: boolean;
  preserveModules: boolean;
  
  // Asset handling
  assets: {
    patterns: string[];
    output: string;
  };
}
```

## Integration with Other Components

The Generator works closely with other Solo Build components:

- **Parser**: Indirectly receives source information from the Parser
- **Transformer**: Receives transformed ASTs from the Transformer
- **Analyzer**: Uses analysis results to optimize output
- **Reporter**: Sends generation data to the Reporter for reporting

## Examples

### Basic JavaScript Library

```javascript
// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  generator: {
    outDir: 'dist',
    format: 'esm',
    minify: true,
    sourceMaps: true,
    banner: '/* MyLibrary v1.0.0 */'
  }
};
```

### React Component Library

```javascript
// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  generator: {
    formats: [
      {
        format: 'cjs',
        outDir: 'dist/cjs',
        minify: false
      },
      {
        format: 'esm',
        outDir: 'dist/esm',
        minify: false
      }
    ],
    sourceMaps: true,
    preserveModules: true,  // Keep directory structure
    assets: {
      patterns: ['src/**/*.css', 'src/**/*.svg'],
      output: '.'  // Preserve relative paths
    }
  }
};
```

### Node.js Application

```javascript
// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  generator: {
    outDir: 'dist',
    format: 'cjs',
    minify: false,
    banner: '#!/usr/bin/env node\n',  // Add shebang for executable
    assets: {
      patterns: [
        'src/templates/**/*',
        'package.json',
        'README.md'
      ],
      output: '.'
    }
  }
};
```

## Best Practices

1. **Choose the Right Output Format**: Select the appropriate format based on your target environment
2. **Enable Source Maps for Development**: Always enable source maps for better debugging
3. **Minify for Production**: Minify code for production builds to reduce file size
4. **Preserve Module Structure**: Use `preserveModules` for libraries to maintain import paths
5. **Handle Assets Properly**: Configure asset patterns to include all necessary non-code files
6. **Clean Output Directory**: Enable the `clean` option to avoid stale files
7. **Use Multiple Formats**: Generate multiple formats for libraries to support different environments
8. **Add License Information**: Use the banner option to include license information
