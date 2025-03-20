<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Examples</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          See how Solo Build can be used in different scenarios to optimize your development workflow.
        </p>
      </div>

      <!-- Example Tabs -->
      <UTabs :items="tabs" class="mb-16">
        <template #item="{ item }">
          <div class="p-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 class="text-2xl font-bold mb-4">{{ item.description }}</h3>
                <p class="mb-4">{{ item.details }}</p>
                <div class="space-y-4">
                  <div v-for="(step, index) in item.steps" :key="index" class="flex">
                    <div class="flex-shrink-0 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">
                      {{ index + 1 }}
                    </div>
                    <div class="ml-4">
                      <h4 class="text-lg font-semibold mb-1">{{ step.title }}</h4>
                      <p class="text-gray-600 dark:text-gray-400">{{ step.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <UCard>
                  <template #header>
                    <div class="flex items-center justify-between">
                      <h4 class="text-lg font-semibold">{{ item.codeTitle }}</h4>
                      <UButton
                        icon="i-heroicons-clipboard"
                        color="gray"
                        variant="ghost"
                        size="xs"
                        @click="copyCode(item.code)"
                      >
                        Copy
                      </UButton>
                    </div>
                  </template>
                  <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>{{ item.code }}</code></pre>
                </UCard>
                <div class="mt-6">
                  <UCard>
                    <template #header>
                      <div class="flex items-center justify-between">
                        <h4 class="text-lg font-semibold">Output</h4>
                      </div>
                    </template>
                    <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>{{ item.output }}</code></pre>
                  </UCard>
                </div>
              </div>
            </div>
          </div>
        </template>
      </UTabs>

      <!-- Real-World Examples -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8">Real-World Examples</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard>
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-simple-icons-react" class="h-6 w-6 text-primary-500 mr-3" />
                <h3 class="text-xl font-semibold">React Application</h3>
              </div>
            </template>
            <p class="mb-4">
              Optimize a React application with Solo Build for improved performance and code quality.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
              <li>Automatic JSX optimization</li>
              <li>React-specific code analysis</li>
              <li>Component dependency tracking</li>
              <li>Performance optimization suggestions</li>
            </ul>
            <UButton
              to="/examples/react"
              variant="ghost"
              size="sm"
              class="mt-2"
            >
              View Example
            </UButton>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-simple-icons-vuedotjs" class="h-6 w-6 text-primary-500 mr-3" />
                <h3 class="text-xl font-semibold">Vue.js Application</h3>
              </div>
            </template>
            <p class="mb-4">
              Build and analyze a Vue.js application with Solo Build for better maintainability.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
              <li>Vue SFC compilation</li>
              <li>Component relationship analysis</li>
              <li>Vue-specific optimizations</li>
              <li>Template analysis for performance</li>
            </ul>
            <UButton
              to="/examples/vue"
              variant="ghost"
              size="sm"
              class="mt-2"
            >
              View Example
            </UButton>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center">
                <UIcon name="i-simple-icons-nodedotjs" class="h-6 w-6 text-primary-500 mr-3" />
                <h3 class="text-xl font-semibold">Node.js Library</h3>
              </div>
            </template>
            <p class="mb-4">
              Build a Node.js library with Solo Build for optimal compatibility and performance.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 mb-4">
              <li>Multi-format output (CJS, ESM)</li>
              <li>API documentation generation</li>
              <li>Package size optimization</li>
              <li>Dependency analysis</li>
            </ul>
            <UButton
              to="/examples/node"
              variant="ghost"
              size="sm"
              class="mt-2"
            >
              View Example
            </UButton>
          </UCard>
        </div>
      </div>

      <!-- Community Examples -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-center mb-8">Community Examples</h2>
        <UCard>
          <template #header>
            <h3 class="text-xl font-semibold">Share Your Examples</h3>
          </template>
          <p class="mb-4">
            Have you used Solo Build in an interesting way? Share your examples with the community!
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h4 class="font-semibold mb-2">How to Contribute</h4>
              <ol class="list-decimal list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Fork the Solo Build repository</li>
                <li>Add your example to the examples directory</li>
                <li>Submit a pull request</li>
                <li>We'll review and merge your example</li>
              </ol>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Example Requirements</h4>
              <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Clear documentation</li>
                <li>Working configuration</li>
                <li>Demonstrates a specific use case</li>
                <li>Follows best practices</li>
              </ul>
            </div>
          </div>
          <UButton
            to="https://github.com/Mashed-Potato-Studios/solo_build/tree/main/examples"
            target="_blank"
            color="primary"
          >
            View Examples Repository
          </UButton>
        </UCard>
      </div>

      <!-- CTA -->
      <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Try Solo Build?
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Get started with Solo Build today and see how it can improve your development workflow.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <UButton
            to="/docs/getting-started"
            size="lg"
            color="primary"
          >
            Get Started
          </UButton>
          <UButton
            to="https://github.com/Mashed-Potato-Studios/solo_build"
            target="_blank"
            size="lg"
            variant="outline"
          >
            <UIcon name="i-simple-icons-github" class="mr-2" />
            GitHub
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const tabs = [
  {
    label: 'Basic Configuration',
    slot: 'tab-1',
    description: 'Basic Solo Build Configuration',
    details: 'This example shows a basic Solo Build configuration for a TypeScript project. It sets up the source and output directories, target ES version, module format, and other basic options.',
    steps: [
      {
        title: 'Create Configuration File',
        description: 'Create a solo-build.config.js file in your project root.'
      },
      {
        title: 'Define Build Options',
        description: 'Configure source and output directories, target ES version, and module format.'
      },
      {
        title: 'Run Build Command',
        description: 'Execute the build command to compile your TypeScript code.'
      }
    ],
    codeTitle: 'solo-build.config.js',
    code: `// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'commonjs',
  minify: true,
  sourceMaps: true,
  include: ['**/*.ts'],
  exclude: ['**/*.test.ts', 'node_modules/**']
};`,
    output: `$ npx solo-build run
✓ Configuration loaded from solo-build.config.js
✓ Found 24 source files
✓ Parsed 24 files
✓ Analyzed code complexity and dependencies
✓ Transformed code
✓ Generated 24 output files
✓ Build completed in 1.2s`
  },
  {
    label: 'Advanced Analysis',
    slot: 'tab-2',
    description: 'Advanced Code Analysis',
    details: 'This example demonstrates how to use Solo Build\'s advanced code analysis features to gain insights into your codebase, including complexity metrics, dependency analysis, and issue detection.',
    steps: [
      {
        title: 'Configure Analysis Options',
        description: 'Enable various analysis features in your configuration file.'
      },
      {
        title: 'Run Analysis Command',
        description: 'Execute the analyze command to generate reports without building.'
      },
      {
        title: 'Review Analysis Reports',
        description: 'Examine the generated reports to identify areas for improvement.'
      }
    ],
    codeTitle: 'solo-build.config.js',
    code: `// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  outDir: 'dist',
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: true,
    security: true
  },
  reports: {
    outputDir: 'reports',
    formats: ['html', 'json', 'markdown']
  }
};`,
    output: `$ npx solo-build analyze
✓ Configuration loaded from solo-build.config.js
✓ Found 32 source files
✓ Parsed 32 files
✓ Analyzing code complexity...
✓ Analyzing dependencies...
✓ Analyzing code duplication...
✓ Analyzing security issues...
✓ Generated complexity report
✓ Generated dependencies report
✓ Generated duplication report
✓ Generated security report
✓ Analysis completed in 2.3s
📊 Reports available in ./reports directory`
  },
  {
    label: 'Workflow Automation',
    slot: 'tab-3',
    description: 'Workflow Automation',
    details: 'This example shows how to use Solo Build\'s workflow system to automate your build process, including running tests, linting, and deploying your application.',
    steps: [
      {
        title: 'Create Workflow File',
        description: 'Create a workflow file to define your automation process.'
      },
      {
        title: 'Configure Workflow Triggers',
        description: 'Define events that trigger your workflow, such as file changes or manual execution.'
      },
      {
        title: 'Run Workflow Command',
        description: 'Execute the workflow command to run your automation process.'
      }
    ],
    codeTitle: '.solo-build/workflows/build.yml',
    code: `# .solo-build/workflows/build.yml
name: Build and Test
on:
  workflow_dispatch:
  build.start:
    branches:
      - main
      - dev

jobs:
  lint:
    name: Lint
    steps:
      - name: Run ESLint
        run: eslint src/**/*.ts
  
  build:
    name: Build
    needs: lint
    steps:
      - name: Clean
        run: rimraf dist
      
      - name: Build
        run: tsc
  
  test:
    name: Test
    needs: build
    steps:
      - name: Run Tests
        run: jest
      
      - name: Generate Coverage
        run: jest --coverage`,
    output: `$ npx solo-build workflow run build
✓ Workflow 'Build and Test' started
✓ Running job 'lint'
  ✓ Running step 'Run ESLint'
  ✓ ESLint completed with 0 errors and 2 warnings
✓ Job 'lint' completed in 1.5s
✓ Running job 'build'
  ✓ Running step 'Clean'
  ✓ Running step 'Build'
  ✓ TypeScript compilation completed
✓ Job 'build' completed in 3.2s
✓ Running job 'test'
  ✓ Running step 'Run Tests'
  ✓ Running step 'Generate Coverage'
  ✓ Tests completed: 42 passed, 0 failed
  ✓ Coverage: 87.5%
✓ Job 'test' completed in 4.1s
✓ Workflow 'Build and Test' completed in 8.8s`
  },
  {
    label: 'Custom Transformations',
    slot: 'tab-4',
    description: 'Custom Code Transformations',
    details: 'This example demonstrates how to create and use custom transformations to modify your code during the build process, such as adding license headers, removing console.log statements, or applying other custom modifications.',
    steps: [
      {
        title: 'Create Transformer Plugin',
        description: 'Create a custom transformer plugin to modify your code.'
      },
      {
        title: 'Configure Transformations',
        description: 'Add your custom transformer to the build configuration.'
      },
      {
        title: 'Run Build Command',
        description: 'Execute the build command to apply your custom transformations.'
      }
    ],
    codeTitle: 'transformers/remove-console-logs.js',
    code: `// transformers/remove-console-logs.js
module.exports = {
  name: 'remove-console-logs',
  transform: (ast, context) => {
    // Simple example: remove all console.log statements
    return {
      visitor: {
        CallExpression(path) {
          if (
            path.node.callee.type === 'MemberExpression' &&
            path.node.callee.object.name === 'console' &&
            path.node.callee.property.name === 'log'
          ) {
            path.remove();
          }
        }
      }
    };
  }
};

// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  outDir: 'dist',
  transformers: [
    require('./transformers/remove-console-logs')
  ]
};`,
    output: `$ npx solo-build run
✓ Configuration loaded from solo-build.config.js
✓ Found 18 source files
✓ Parsed 18 files
✓ Applying transformations...
  ✓ Applied transformer 'remove-console-logs'
  ✓ Removed 42 console.log statements
✓ Generated 18 output files
✓ Build completed in 0.9s`
  }
];

function copyCode(code) {
  navigator.clipboard.writeText(code);
  // You could add a toast notification here
}
</script>
