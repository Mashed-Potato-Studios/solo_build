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
