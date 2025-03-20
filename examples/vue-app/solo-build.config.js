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
