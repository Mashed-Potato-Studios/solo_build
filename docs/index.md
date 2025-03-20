# Solo Build Documentation

Welcome to the Solo Build documentation. Solo Build is an AI-powered build system for JavaScript and TypeScript projects with advanced code analysis capabilities.

## Table of Contents

- [Getting Started](#getting-started)
- [Core Components](#core-components)
- [CLI Commands](#cli-commands)
- [Configuration](#configuration)
- [Advanced Usage](#advanced-usage)
- [API Reference](#api-reference)

## Getting Started

### Installation

```bash
npm install solo-build
```

### Quick Start

1. Create a configuration file in your project root:

```js
// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'commonjs',
  minify: true,
  sourceMaps: true,
  include: ['**/*.ts'],
  exclude: ['**/*.test.ts', 'node_modules/**']
};
```

2. Run the build command:

```bash
npx solo-build run
```

## Core Components

Solo Build consists of several core components that work together to provide a complete build system:

- [Parser](./parser.md): Parses source files into Abstract Syntax Trees (ASTs)
- [Analyzer](./analyzer.md): Analyzes code for complexity, dependencies, and issues
- [Transformer](./transformer.md): Applies transformations to the AST
- [Generator](./generator.md): Generates output files from the transformed AST
- [Workflow Engine](./workflow.md): Provides a GitHub Actions-like workflow system
- [Task Runner](./task-runner.md): Runs tasks before, during, and after the build process
- [Reporter](./reporter.md): Generates reports about the build process

## CLI Commands

Solo Build provides several CLI commands for different tasks:

### Build

Run the build process:

```bash
npx solo-build run [options]
```

Options:
- `--config`: Path to config file (default: solo-build.config.js)
- `--workflow`: Workflow to run (default: default)

### Initialize

Initialize a new project with Solo Build:

```bash
npx solo-build init [options]
```

Options:
- `--template`: Template to use (default: typescript)
- `--name`: Project name

### Analyze

Analyze code without building:

```bash
npx solo-build analyze [options]
```

Options:
- `--config`: Path to config file (default: solo-build.config.js)
- `--format`: Output format (default: text)

### Workflow

Manage workflows:

```bash
npx solo-build workflow [command] [options]
```

Commands:
- `list`: List available workflows
- `create`: Create a new workflow

## Configuration

Solo Build can be configured using a JavaScript, TypeScript, or JSON configuration file. By default, it looks for a file named `solo-build.config.js` in the project root.

See the [Configuration](./configuration.md) page for detailed information about all available configuration options.

## Advanced Usage

Solo Build provides several advanced features for more complex use cases:

- [Custom Transformations](./custom-transformations.md): Create custom transformations for the AST
- [Custom Analyzers](./custom-analyzers.md): Create custom analyzers for code analysis
- [Workflows](./workflows.md): Create complex build workflows
- [Plugins](./plugins.md): Extend Solo Build with plugins

## API Reference

Solo Build provides a JavaScript API for programmatic usage:

```typescript
import { build, analyze, parse, transform, generate } from 'solo-build';

// Run the build process
const result = await build({
  sourceDir: 'src',
  outDir: 'dist',
  // ... other options
});

// Analyze code
const analysis = await analyze({
  sourceDir: 'src',
  // ... other options
});
```

See the [API Reference](./api-reference.md) page for detailed information about all available API functions.
