---
title: Getting Started with Solo Build
description: Learn how to quickly get up and running with Solo Build, the AI-powered build system for modern JavaScript and TypeScript projects
---

# Getting Started with Solo Build

This guide will help you quickly get up and running with Solo Build, the AI-powered build system for modern JavaScript and TypeScript projects.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: Version 14.x or higher
- **npm** or **yarn**: For package management

## Installation

You can install Solo Build globally or as a project dependency.

### Global Installation

```bash
# Using npm
npm install -g @solo-build/cli

# Using yarn
yarn global add @solo-build/cli
```

### Project Installation

```bash
# Using npm
npm install --save-dev @solo-build/cli

# Using yarn
yarn add --dev @solo-build/cli
```

## Quick Start

### Initialize a New Project

To initialize a new project with Solo Build:

```bash
# Using global installation
solo-build init my-project

# Using npx
npx @solo-build/cli init my-project

# In an existing project
cd my-project
npx @solo-build/cli init
```

This will create a basic project structure and configuration files.

### Basic Configuration

Solo Build uses a configuration file to customize its behavior. By default, it looks for `solo-build.config.js` in your project root.

Here's a basic configuration:

```javascript
// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'esm',
  minify: true,
  sourceMaps: true
};
```

### Building Your Project

To build your project:

```bash
# Using global installation
solo-build run

# Using npx
npx @solo-build/cli run

# Using npm script (if you've added it to package.json)
npm run build
```

## Project Structure

A typical Solo Build project structure looks like this:

```
my-project/
├── src/                  # Source files
│   ├── index.ts          # Entry point
│   └── components/       # Components
├── dist/                 # Output directory (generated)
├── solo-build.config.js  # Configuration file
├── package.json          # Package configuration
└── tsconfig.json         # TypeScript configuration (optional)
```

## Configuration Options

Here are some common configuration options:

### Basic Options

```javascript
module.exports = {
  // Input and output
  sourceDir: 'src',
  outDir: 'dist',
  
  // JavaScript target and module format
  target: 'es2020',       // 'es5', 'es2015', 'es2020', etc.
  module: 'esm',          // 'commonjs', 'esm', 'umd'
  
  // Optimization
  minify: true,
  sourceMaps: true,
  
  // File patterns
  include: ['**/*.ts', '**/*.tsx'],
  exclude: ['**/*.test.ts', 'node_modules/**']
};
```

### Advanced Options

```javascript
module.exports = {
  // ... basic options
  
  // Parser options
  parser: {
    implementation: 'babel',
    plugins: ['typescript', 'jsx']
  },
  
  // Transformer options
  transformer: {
    jsx: 'react',
    plugins: [
      '@solo-build/plugin-typescript',
      '@solo-build/plugin-jsx'
    ]
  },
  
  // Analysis options
  analyze: {
    complexity: true,
    dependencies: true
  },
  
  // Report generation
  reports: {
    outputDir: 'reports',
    formats: ['html', 'json']
  }
};
```

## CLI Commands

Solo Build provides several CLI commands:

### Build Command

```bash
solo-build run [options]
```

Options:
- `--watch`: Watch for file changes and rebuild
- `--config <path>`: Specify a custom configuration file
- `--verbose`: Show detailed output

### Initialize Command

```bash
solo-build init [project-name] [options]
```

Options:
- `--template <name>`: Specify a project template
- `--typescript`: Initialize with TypeScript support
- `--react`: Initialize with React support

### Analyze Command

```bash
solo-build analyze [options]
```

Options:
- `--file <path>`: Analyze a specific file
- `--complexity`: Show complexity metrics
- `--dependencies`: Show dependency information
- `--output <format>`: Output format (json, html, markdown)

### Workflow Command

```bash
solo-build workflow <subcommand> [options]
```

Subcommands:
- `list`: List available workflows
- `run <name>`: Run a specific workflow
- `status <name>`: Show workflow status

## Using with TypeScript

Solo Build has built-in support for TypeScript. To use it:

1. Make sure you have TypeScript installed:
   ```bash
   npm install --save-dev typescript
   ```

2. Configure TypeScript in your `solo-build.config.js`:
   ```javascript
   module.exports = {
     parser: {
       plugins: ['typescript']
     },
     transformer: {
       plugins: ['@solo-build/plugin-typescript']
     }
   };
   ```

3. Create a `tsconfig.json` file (optional, for editor support):
   ```json
   {
     "compilerOptions": {
       "target": "es2020",
       "module": "esnext",
       "moduleResolution": "node",
       "strict": true,
       "esModuleInterop": true,
       "skipLibCheck": true,
       "forceConsistentCasingInFileNames": true
     },
     "include": ["src/**/*"]
   }
   ```

## Using with React

To use Solo Build with React:

1. Install React:
   ```bash
   npm install react react-dom
   npm install --save-dev @types/react @types/react-dom
   ```

2. Configure JSX support in your `solo-build.config.js`:
   ```javascript
   module.exports = {
     parser: {
       plugins: ['typescript', 'jsx']
     },
     transformer: {
       jsx: 'react',
       jsxImportSource: 'react',
       plugins: [
         '@solo-build/plugin-typescript',
         '@solo-build/plugin-jsx'
       ]
     }
   };
   ```

## Next Steps

Now that you have Solo Build set up, here are some next steps:

1. **Explore the documentation** for more advanced features
2. **Configure code analysis** to improve your code quality
3. **Set up workflows** to automate your build process
4. **Create custom transformers** for project-specific needs
5. **Integrate with your CI/CD pipeline** for automated builds

Check out the following documentation pages for more information:

- [Configuration Reference](/docs/configuration)
- [Parser Documentation](/docs/parser)
- [Analyzer Documentation](/docs/analyzer)
- [Transformer Documentation](/docs/transformer)
- [Workflow Engine Documentation](/docs/workflow)
