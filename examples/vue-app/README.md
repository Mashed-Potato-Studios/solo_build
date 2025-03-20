# Solo Build Vue.js Example

This is a sample Vue.js application demonstrating how to integrate Solo Build into your Vue.js projects.

## Features

- Counter component with increment/decrement functionality
- Task manager with add/complete/delete functionality
- Integration with Solo Build for optimized builds and analysis

## Solo Build Integration

This project uses Solo Build to:

1. **Analyze Code Complexity**: Identify complex components that might need refactoring
2. **Track Dependencies**: Monitor and manage package dependencies
3. **Detect Issues**: Find potential bugs and code quality issues
4. **Optimize Build Process**: Streamline the build workflow for better performance

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the application:
   ```
   npm run serve
   ```
4. Run Solo Build:
   ```
   npm run solo-build
   ```

## Project Structure

- `src/App.vue`: Main application component
- `src/components/`: Component directory
  - `Counter.vue`: Simple counter component
  - `TaskManager.vue`: Task management component
- `solo-build.config.js`: Solo Build configuration file

## Solo Build Configuration

The `solo-build.config.js` file contains the configuration for Solo Build:

```js
module.exports = {
  sourceDir: 'src',
  outputDir: 'dist',
  framework: 'vue',
  analyze: {
    complexity: true,
    dependencies: true,
    issues: true
  },
  workflows: {
    build: {
      steps: [
        {
          name: 'Install dependencies',
          run: 'npm install'
        },
        {
          name: 'Lint code',
          run: 'npm run lint'
        },
        {
          name: 'Build project',
          run: 'npm run build'
        }
      ]
    }
  }
}
```
