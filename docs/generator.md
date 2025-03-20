# Generator Component

The Generator component is responsible for generating output files from the transformed AST. It handles code generation, source map generation, and file writing.

## Overview

The Generator takes the transformed AST from the Transformer component and generates JavaScript code that can be executed in the target environment. It also handles source map generation to help with debugging.

## API

### Constructor

```typescript
constructor(config: BuildConfig)
```

Creates a new Generator instance with the specified configuration.

#### Parameters

- `config`: The build configuration object

### Methods

#### generate

```typescript
async generate(transformedAst: Record<string, any>): Promise<GeneratorResult>
```

Generates output files from the transformed AST.

##### Parameters

- `transformedAst`: A record of file paths to their transformed AST

##### Returns

A promise that resolves to a `GeneratorResult` object containing:
- `files`: An array of generated file paths
- `stats`: Statistics about the generation process

#### generateCode

```typescript
generateCode(ast: any, options?: GenerateOptions): GenerateResult
```

Generates JavaScript code from an AST.

##### Parameters

- `ast`: The AST to generate code from
- `options`: Options for code generation

##### Returns

A `GenerateResult` object containing:
- `code`: The generated JavaScript code
- `map`: The source map (if source maps are enabled)

#### createOutputDirectory

```typescript
async createOutputDirectory(outputPath: string): Promise<void>
```

Creates the output directory for a file if it doesn't exist.

##### Parameters

- `outputPath`: The path to the output file

## Configuration Options

The Generator component uses the following configuration options:

- `outDir`: The directory to output generated files to
- `sourceMaps`: Whether to generate source maps
- `minify`: Whether to minify the generated code
- `target`: The ECMAScript target version

## Example Usage

```typescript
import { Generator } from './generator';
import { BuildConfig } from '../types';

// Create a configuration
const config: BuildConfig = {
  projectRoot: '/path/to/project',
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'commonjs',
  minify: true,
  sourceMaps: true,
  // ... other config options
};

// Create a generator
const generator = new Generator(config);

// Generate code from transformed AST
const transformedAst = {
  '/path/to/project/src/index.ts': {
    // AST structure
  }
};

const result = await generator.generate(transformedAst);
console.log(`Generated ${result.files.length} files`);
```

## Implementation Details

The Generator uses Babel's generator to convert AST to code. It handles the following tasks:

1. Creating output directories
2. Generating JavaScript code from AST
3. Generating source maps (if enabled)
4. Minifying code (if enabled)
5. Writing files to disk

## Error Handling

The Generator handles errors during the generation process and provides detailed error messages. If a file fails to generate, the error is logged, but the generation process continues for other files.

## Performance Considerations

- The Generator processes files in parallel for better performance
- Source map generation can increase memory usage and processing time
- Minification can significantly increase processing time for large files

## Future Improvements

- Add support for more output formats (e.g., ESM, UMD)
- Improve minification options
- Add support for code splitting
- Add support for asset handling (e.g., CSS, images)
