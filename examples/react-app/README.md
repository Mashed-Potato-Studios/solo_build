# Solo Build React Example

This is a sample React application demonstrating how to integrate Solo Build into your React projects.

## Features

- Simple counter component with increment/decrement functionality
- Todo list with add/delete functionality
- Integration with Solo Build for optimized builds and analysis

## Solo Build Integration

This project uses Solo Build to:

1. **Analyze Code Complexity**: Identify complex components that might need refactoring
2. **Track Dependencies**: Monitor and manage package dependencies
3. **Optimize Build Process**: Streamline the build workflow for better performance

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the application:
   ```
   npm start
   ```
4. Run Solo Build:
   ```
   npm run solo-build
   ```

## Project Structure

- `src/App.jsx`: Main application component
- `solo-build.config.js`: Solo Build configuration file

## Solo Build Configuration

The `solo-build.config.js` file contains the configuration for Solo Build:

```js
module.exports = {
  sourceDir: 'src',
  outputDir: 'dist',
  framework: 'react',
  analyze: {
    complexity: true,
    dependencies: true
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
          name: 'Build project',
          run: 'npm run build'
        }
      ]
    }
  }
}
```
