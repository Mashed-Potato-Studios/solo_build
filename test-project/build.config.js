// build.config.js
module.exports = {
  projectRoot: __dirname,
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'commonjs',
  minify: true,
  sourceMaps: true,
  include: ['**/*.ts'],
  exclude: ['**/*.test.ts', 'node_modules/**'],
  tasks: {
    'pre-build': {
      type: 'command',
      command: 'echo "Starting build process..."'
    },
    'post-build': {
      type: 'command',
      command: 'echo "Build completed successfully!"'
    }
  },
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: false,
    security: true
  },
  ai: {
    enabled: false,
    optimizationMode: 'suggestion',
    analysisDepth: 'basic'
  }
};
