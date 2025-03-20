# Solo Build

An AI-powered build system for JavaScript and TypeScript projects with advanced code analysis capabilities.

## Features

- **TypeScript/JavaScript Support**: Build TypeScript projects with configurable output options
- **AI-Powered Analysis**: Get architectural insights and optimization suggestions *(coming soon)*
- **Workflow System**: GitHub Actions-like workflow system for automation
- **Code Analysis**: Analyze code complexity, dependencies, and detect issues
- **Framework Detection**: Automatically detect frameworks and apply optimized build configurations
- **Extensible**: Plug-in architecture for custom transformations and analyzers

## Installation

```bash
npm install solo-build
```

## Quick Start

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

## CLI Commands

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

### Build Configuration

```typescript
interface BuildConfig {
  // Project settings
  projectRoot: string;
  sourceDir: string;
  outDir: string;
  
  // Build options
  target: string;
  module: string;
  minify: boolean;
  sourceMaps: boolean;
  
  // File selection
  include: string[];
  exclude: string[];
  
  // Tasks
  tasks: Record<string, Task>;
  
  // Analysis options
  analyze: {
    complexity: boolean;
    dependencies: boolean;
    duplication: boolean;
    security: boolean;
  };
  
  // AI options (coming soon)
  ai: {
    enabled: boolean;
    optimizationMode: string;
    analysisDepth: string;
  };
}
```

### Task Configuration

```typescript
interface Task {
  type: string;
  command?: string;
  dependencies?: string[];
  condition?: string;
}
```

### Workflow Configuration

```typescript
interface Workflow {
  name: string;
  on: Record<string, any>;
  jobs: Record<string, Job>;
}

interface Job {
  name: string;
  steps: Step[];
}

interface Step {
  name: string;
  run?: string;
  uses?: string;
  with?: Record<string, any>;
}
```

## Examples

### Basic TypeScript Project

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

### React Project

```js
// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'esm',
  minify: true,
  sourceMaps: true,
  include: ['**/*.ts', '**/*.tsx'],
  exclude: ['**/*.test.ts', '**/*.test.tsx', 'node_modules/**'],
  tasks: {
    'pre-build': {
      type: 'command',
      command: 'rimraf dist'
    },
    'post-build': {
      type: 'command',
      command: 'cp public/* dist/'
    }
  }
};
```

### With Workflow

```js
// solo-build.config.js
module.exports = {
  // ... build config
  workflows: {
    build: {
      on: {
        push: {
          branches: ['main']
        }
      },
      jobs: {
        build: {
          steps: [
            {
              name: 'Clean',
              run: 'rimraf dist'
            },
            {
              name: 'Build',
              run: 'solo-build run'
            },
            {
              name: 'Test',
              run: 'jest'
            }
          ]
        }
      }
    }
  }
};
```

## Advanced Usage

### Custom Transformations

You can create custom transformations by implementing the `Transformation` interface:

```typescript
import { Transformation } from 'solo-build';

export class MyTransformation implements Transformation {
  name = 'my-transformation';
  
  apply(ast, context) {
    // Transform the AST
    return ast;
  }
}
```

### Custom Analyzers

You can create custom analyzers by implementing the `Analyzer` interface:

```typescript
import { Analyzer } from 'solo-build';

export class MyAnalyzer implements Analyzer {
  name = 'my-analyzer';
  
  analyze(ast, context) {
    // Analyze the AST
    return {
      issues: [],
      metrics: {}
    };
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Coming Soon / Roadmap

The following features are planned for upcoming releases:

### AI Integration (High Priority)
- **AI-Powered Architectural Insights**: Advanced code analysis with architectural recommendations
- **Optimization Suggestions**: AI-generated suggestions for code optimization
- **Code Quality Analysis**: Intelligent detection of code smells and anti-patterns
- **Dependency Management**: Smart recommendations for dependency updates and security fixes

### Other Planned Features
- **Enhanced Minification**: Integration with Terser for better code optimization
- **Code Splitting**: Automatic code splitting for improved performance
- **More Output Formats**: Support for various module formats (ESM, UMD, etc.)
- **Plugin System**: Extensible plugin architecture for custom build steps
- **Incremental Builds**: Support for faster incremental builds
- **Watch Mode**: Live rebuilding when files change
- **Performance Profiling**: Detailed performance metrics for build optimization

## To Do

The following are specific tasks that need to be completed in the near term:

### AI Integration Implementation
- [ ] Integrate with OpenAI API for code analysis
- [ ] Implement architectural pattern recognition
- [ ] Create AI-powered optimization suggestion engine
- [ ] Add configuration options for AI depth and focus areas
- [ ] Implement caching for AI responses to reduce API calls

### Testing Improvements
- [ ] Add tests for the Transformer component
- [ ] Add tests for the Workflow Engine
- [ ] Create more comprehensive integration tests
- [ ] Add performance benchmarks

### Documentation Enhancements
- [ ] Add more examples for different project types
- [ ] Create video tutorials for common workflows
- [ ] Document all configuration options in detail
- [ ] Add troubleshooting guide

### Performance Optimizations
- [ ] Implement incremental builds
- [ ] Add watch mode for development
- [ ] Optimize parallel processing of files
- [ ] Reduce memory usage for large projects

## License

MIT
