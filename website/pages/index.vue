<template>
  <div>
    <!-- Hero Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 class="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              AI-Powered Build System for Modern JavaScript
            </h1>
            <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Solo Build is a next-generation build system that combines powerful code analysis, 
              intelligent optimization, and a flexible workflow engine to supercharge your JavaScript 
              and TypeScript projects.
            </p>
            <div class="flex flex-wrap gap-4">
              <UButton
                to="/docs/getting-started"
                size="lg"
                color="primary"
              >
                Get Started
                <template #trailing>
                  <UIcon name="i-heroicons-arrow-right" />
                </template>
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
          <div class="relative">
            <div class="bg-gray-800 dark:bg-gray-700 rounded-lg shadow-xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <pre class="text-sm text-gray-200 overflow-x-auto">
<code>// solo-build.config.js
module.exports = {
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'commonjs',
  minify: true,
  analyze: {
    complexity: true,
    dependencies: true
  },
  ai: {
    enabled: true,
    optimizationMode: 'aggressive'
  }
};</code>
              </pre>
            </div>
            <div class="absolute -bottom-6 -right-6 bg-primary-500 text-white px-4 py-2 rounded-full shadow-lg">
              Simple Configuration
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Solo Build combines the best build tools with AI-powered analysis to create
            a seamless development experience.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard>
            <template #header>
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto">
                <UIcon name="i-heroicons-code-bracket" class="h-8 w-8 text-primary-500" />
              </div>
            </template>
            <template #title>
              TypeScript/JavaScript Support
            </template>
            <p>
              Build TypeScript projects with configurable output options, including target ES version,
              module format, and more.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto">
                <UIcon name="i-heroicons-cpu-chip" class="h-8 w-8 text-primary-500" />
              </div>
            </template>
            <template #title>
              AI-Powered Analysis <UBadge color="gray" size="sm">Coming Soon</UBadge>
            </template>
            <p>
              Get architectural insights and optimization suggestions powered by advanced AI models
              to improve your code quality and performance.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto">
                <UIcon name="i-heroicons-command-line" class="h-8 w-8 text-primary-500" />
              </div>
            </template>
            <template #title>
              Workflow System
            </template>
            <p>
              GitHub Actions-like workflow system for automating build tasks, tests, and deployments
              with a simple configuration file.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto">
                <UIcon name="i-heroicons-chart-bar" class="h-8 w-8 text-primary-500" />
              </div>
            </template>
            <template #title>
              Code Analysis
            </template>
            <p>
              Analyze code complexity, dependencies, and detect issues to improve code quality
              and maintainability.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto">
                <UIcon name="i-heroicons-puzzle-piece" class="h-8 w-8 text-primary-500" />
              </div>
            </template>
            <template #title>
              Framework Detection
            </template>
            <p>
              Automatically detect frameworks and apply optimized build configurations for
              React, Vue, Angular, and more.
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 dark:bg-primary-900 mx-auto">
                <UIcon name="i-heroicons-cube" class="h-8 w-8 text-primary-500" />
              </div>
            </template>
            <template #title>
              Extensible
            </template>
            <p>
              Plug-in architecture for custom transformations and analyzers, allowing you to
              extend the build system to fit your needs.
            </p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Solo Build streamlines your development workflow with a simple yet powerful process.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-primary-500 text-white font-bold">
                1
              </div>
              <h3 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Configure
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              Create a simple configuration file to define your build settings, including source directory,
              output options, and analysis preferences.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-primary-500 text-white font-bold">
                2
              </div>
              <h3 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Build
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              Run the build command to parse, analyze, transform, and generate optimized code for your project,
              with detailed reports on code quality.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <div class="flex items-center mb-4">
              <div class="flex items-center justify-center h-10 w-10 rounded-full bg-primary-500 text-white font-bold">
                3
              </div>
              <h3 class="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Deploy
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              Use the generated output files in your deployment process, with confidence that your code
              is optimized and free of common issues.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Ready to Supercharge Your Build Process?
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Get started with Solo Build today and experience the future of JavaScript and TypeScript development.
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
            Star on GitHub
          </UButton>
        </div>
      </div>
    </section>
  </div>
</template>
