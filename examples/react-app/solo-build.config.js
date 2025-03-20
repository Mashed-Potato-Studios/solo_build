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
