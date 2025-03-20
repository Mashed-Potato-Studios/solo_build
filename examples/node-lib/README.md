# Solo Build Node.js Library Example

This is a sample Node.js library demonstrating how to integrate Solo Build into your Node.js projects.

## Features

- Calculator module with arithmetic operations
- String utilities for common string manipulations
- File manager for file system operations
- TypeScript support with type definitions
- Integration with Solo Build for optimized builds and analysis

## Solo Build Integration

This project uses Solo Build to:

1. **Analyze Code Complexity**: Identify complex functions that might need refactoring
2. **Track Dependencies**: Monitor and manage package dependencies
3. **Detect Issues**: Find potential bugs and code quality issues
4. **Generate Multiple Output Formats**: Create CommonJS and ESM builds
5. **Optimize Build Process**: Streamline the build workflow for better performance

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the library:
   ```
   npm run build
   ```
4. Run Solo Build:
   ```
   npm run solo-build
   ```

## Project Structure

- `src/index.ts`: Main entry point
- `src/calculator.ts`: Calculator module
- `src/stringUtils.ts`: String utility functions
- `src/fileManager.ts`: File system operations
- `solo-build.config.js`: Solo Build configuration file

## Solo Build Configuration

The `solo-build.config.js` file contains the configuration for Solo Build:

```js
module.exports = {
  sourceDir: 'src',
  outputDir: 'dist',
  framework: 'node',
  analyze: {
    complexity: true,
    dependencies: true,
    issues: true
  },
  output: {
    formats: ['cjs', 'esm'],
    dts: true
  },
  workflows: {
    build: {
      steps: [
        {
          name: 'Install dependencies',
          run: 'npm install'
        },
        {
          name: 'Run tests',
          run: 'npm test'
        },
        {
          name: 'Build library',
          run: 'npm run build'
        }
      ]
    }
  }
}
```
