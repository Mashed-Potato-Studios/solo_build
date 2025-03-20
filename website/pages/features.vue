<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-16">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Features</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover the powerful features that make Solo Build the ultimate build system for JavaScript and TypeScript projects.
        </p>
      </div>

      <!-- Main Features -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-code-bracket" class="h-8 w-8 text-primary-500 mr-4" />
              <h2 class="text-2xl font-bold">TypeScript/JavaScript Support</h2>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              Solo Build provides first-class support for TypeScript and JavaScript projects, with advanced features for building, analyzing, and optimizing your code.
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>TypeScript compilation with configurable target and module options</li>
              <li>JavaScript transpilation for cross-browser compatibility</li>
              <li>Support for the latest ECMAScript features</li>
              <li>Type checking and error reporting</li>
              <li>Declaration file generation</li>
              <li>Source map support for debugging</li>
            </ul>
          </div>
        </UCard>

        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-cpu-chip" class="h-8 w-8 text-primary-500 mr-4" />
              <h2 class="text-2xl font-bold">AI-Powered Analysis</h2>
              <UBadge color="gray" size="sm" class="ml-2">Coming Soon</UBadge>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              Leverage the power of AI to gain insights into your codebase and receive intelligent suggestions for improvements.
            </p>
            <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>AI-powered architectural insights for better code organization</li>
              <li>Intelligent optimization suggestions to improve performance</li>
              <li>Code quality analysis to detect code smells and anti-patterns</li>
              <li>Dependency management recommendations for security and updates</li>
              <li>Smart refactoring suggestions to improve maintainability</li>
              <li>Contextual documentation generation</li>
            </ul>
          </div>
        </UCard>
      </div>

      <!-- Additional Features -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-command-line" class="h-6 w-6 text-primary-500 mr-3" />
              <h3 class="text-xl font-semibold">Workflow System</h3>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              A GitHub Actions-like workflow system for automating build tasks, tests, and deployments.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Define workflows in YAML or JavaScript</li>
              <li>Event-driven execution</li>
              <li>Conditional steps and jobs</li>
              <li>Parallel job execution</li>
              <li>Reusable actions and templates</li>
            </ul>
          </div>
        </UCard>

        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-chart-bar" class="h-6 w-6 text-primary-500 mr-3" />
              <h3 class="text-xl font-semibold">Code Analysis</h3>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              Comprehensive code analysis to improve quality, performance, and maintainability.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Complexity analysis (cyclomatic, cognitive)</li>
              <li>Dependency graph generation</li>
              <li>Issue detection and reporting</li>
              <li>Code duplication analysis</li>
              <li>Security vulnerability scanning</li>
              <li>Performance bottleneck detection</li>
            </ul>
          </div>
        </UCard>

        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-puzzle-piece" class="h-6 w-6 text-primary-500 mr-3" />
              <h3 class="text-xl font-semibold">Framework Detection</h3>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              Automatically detect frameworks and apply optimized build configurations.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Support for React, Vue, Angular, and more</li>
              <li>Framework-specific optimizations</li>
              <li>Automatic configuration adjustment</li>
              <li>Best practices enforcement</li>
              <li>Framework-specific analysis</li>
            </ul>
          </div>
        </UCard>

        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-cube" class="h-6 w-6 text-primary-500 mr-3" />
              <h3 class="text-xl font-semibold">Extensible</h3>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              Plug-in architecture for custom transformations and analyzers.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Custom transformer plugins</li>
              <li>Custom analyzer plugins</li>
              <li>Custom reporter plugins</li>
              <li>Middleware support</li>
              <li>Hook system for build lifecycle</li>
            </ul>
          </div>
        </UCard>

        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-bolt" class="h-6 w-6 text-primary-500 mr-3" />
              <h3 class="text-xl font-semibold">Performance</h3>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              Optimized for speed and efficiency, even with large codebases.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Parallel processing</li>
              <li>Incremental builds</li>
              <li>Caching for faster rebuilds</li>
              <li>Memory-efficient operations</li>
              <li>Optimized file I/O</li>
            </ul>
          </div>
        </UCard>

        <UCard class="h-full">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-heroicons-document-text" class="h-6 w-6 text-primary-500 mr-3" />
              <h3 class="text-xl font-semibold">Reporting</h3>
            </div>
          </template>
          <div class="space-y-4">
            <p>
              Comprehensive reports on build process, code quality, and performance.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>HTML, JSON, and Markdown reports</li>
              <li>Visualizations for complexity and dependencies</li>
              <li>Issue summaries and recommendations</li>
              <li>Performance metrics</li>
              <li>Build time analysis</li>
            </ul>
          </div>
        </UCard>
      </div>

      <!-- Feature Comparison -->
      <div class="mb-20">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Feature Comparison
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-100 dark:bg-gray-800">
                <th class="py-3 px-4 text-left border border-gray-200 dark:border-gray-700">Feature</th>
                <th class="py-3 px-4 text-center border border-gray-200 dark:border-gray-700">Solo Build</th>
                <th class="py-3 px-4 text-center border border-gray-200 dark:border-gray-700">Webpack</th>
                <th class="py-3 px-4 text-center border border-gray-200 dark:border-gray-700">Rollup</th>
                <th class="py-3 px-4 text-center border border-gray-200 dark:border-gray-700">esbuild</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">TypeScript Support</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
              </tr>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">AI-Powered Analysis</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">🔜</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
              </tr>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">Workflow System</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
              </tr>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">Code Analysis</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
              </tr>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">Framework Detection</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
              </tr>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">Extensibility</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
              </tr>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">Build Speed</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
              </tr>
              <tr>
                <td class="py-2 px-4 border border-gray-200 dark:border-gray-700">Detailed Reporting</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">✅</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">⚠️</td>
                <td class="py-2 px-4 text-center border border-gray-200 dark:border-gray-700">❌</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 text-sm text-gray-600 dark:text-gray-400">
          <p>✅ Full support | ⚠️ Partial support | ❌ No support | 🔜 Coming soon</p>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-primary-50 dark:bg-primary-900 rounded-lg p-8 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Experience These Features?
        </h2>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Get started with Solo Build today and supercharge your JavaScript and TypeScript development.
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
