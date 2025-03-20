// solo-build.config.js
module.exports = {
  projectRoot: __dirname,
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'commonjs',
  minify: true,
  sourceMaps: true,
  include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/*.test.*', '**/*.spec.*'],
  tasks: {
    'pre-build': {
      type: 'command',
      command: 'echo "Running pre-build tasks..."'
    },
    'post-build': {
      type: 'command',
      command: 'echo "Running post-build tasks..."'
    }
  },
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: false,
    security: true
  },
  ai: {
    enabled: true,
    optimizationMode: 'suggestion',
    analysisDepth: 'detailed'
  }
}
