<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Documentation</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Comprehensive guides and references for Solo Build.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Left Sidebar - Navigation -->
        <div class="md:col-span-1">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Navigation</h3>
            </template>
            <div class="space-y-2">
              <UButton
                to="/docs/getting-started"
                block
                variant="ghost"
                class="justify-start"
              >
                Getting Started
              </UButton>
              <UButton
                to="/docs/installation"
                block
                variant="ghost"
                class="justify-start"
              >
                Installation
              </UButton>
              <UButton
                to="/docs/configuration"
                block
                variant="ghost"
                class="justify-start"
              >
                Configuration
              </UButton>
              <UDivider />
              <h4 class="font-medium text-sm text-gray-500 dark:text-gray-400 py-2 px-3">
                Core Components
              </h4>
              <UButton
                to="/docs/parser"
                block
                variant="ghost"
                class="justify-start"
              >
                Parser
              </UButton>
              <UButton
                to="/docs/analyzer"
                block
                variant="ghost"
                class="justify-start"
              >
                Analyzer
              </UButton>
              <UButton
                to="/docs/transformer"
                block
                variant="ghost"
                class="justify-start"
              >
                Transformer
              </UButton>
              <UButton
                to="/docs/generator"
                block
                variant="ghost"
                class="justify-start"
              >
                Generator
              </UButton>
              <UButton
                to="/docs/workflow"
                block
                variant="ghost"
                class="justify-start"
              >
                Workflow Engine
              </UButton>
              <UButton
                to="/docs/task-runner"
                block
                variant="ghost"
                class="justify-start"
              >
                Task Runner
              </UButton>
              <UButton
                to="/docs/reporter"
                block
                variant="ghost"
                class="justify-start"
              >
                Reporter
              </UButton>
              <UDivider />
              <h4 class="font-medium text-sm text-gray-500 dark:text-gray-400 py-2 px-3">
                CLI Commands
              </h4>
              <UButton
                to="/docs/cli/run"
                block
                variant="ghost"
                class="justify-start"
              >
                Run
              </UButton>
              <UButton
                to="/docs/cli/init"
                block
                variant="ghost"
                class="justify-start"
              >
                Init
              </UButton>
              <UButton
                to="/docs/cli/analyze"
                block
                variant="ghost"
                class="justify-start"
              >
                Analyze
              </UButton>
              <UButton
                to="/docs/cli/workflow"
                block
                variant="ghost"
                class="justify-start"
              >
                Workflow
              </UButton>
            </div>
          </UCard>
        </div>

        <!-- Main Content -->
        <div class="md:col-span-2">
          <UCard>
            <template #header>
              <h2 class="text-2xl font-bold">Solo Build Documentation</h2>
            </template>
            
            <p class="mb-4">
              Welcome to the Solo Build documentation. Here you'll find comprehensive guides and references to help you get the most out of Solo Build.
            </p>

            <h3 class="text-xl font-semibold mb-2">Getting Started</h3>
            <p class="mb-4">
              Solo Build is an AI-powered build system for JavaScript and TypeScript projects with advanced code analysis capabilities. It combines powerful code analysis, intelligent optimization, and a flexible workflow engine to supercharge your projects.
            </p>

            <h3 class="text-xl font-semibold mb-2">Core Components</h3>
            <p class="mb-4">
              Solo Build is composed of several core components that work together to provide a comprehensive build system:
            </p>

            <div class="space-y-4">
              <UCard>
                <template #title>
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-document-text" class="mr-2 text-primary-500" />
                    Parser
                  </div>
                </template>
                <p>
                  The Parser component is responsible for parsing source files into Abstract Syntax Trees (ASTs) that can be analyzed and transformed.
                </p>
                <template #footer>
                  <UButton
                    to="/docs/parser"
                    variant="ghost"
                    size="sm"
                  >
                    Learn More
                  </UButton>
                </template>
              </UCard>

              <UCard>
                <template #title>
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-magnifying-glass" class="mr-2 text-primary-500" />
                    Analyzer
                  </div>
                </template>
                <p>
                  The Analyzer component analyzes code complexity, dependencies, and detects issues to improve code quality and maintainability.
                </p>
                <template #footer>
                  <UButton
                    to="/docs/analyzer"
                    variant="ghost"
                    size="sm"
                  >
                    Learn More
                  </UButton>
                </template>
              </UCard>

              <UCard>
                <template #title>
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-arrow-path" class="mr-2 text-primary-500" />
                    Transformer
                  </div>
                </template>
                <p>
                  The Transformer component applies transformations to the AST, such as minification, optimization, and transpilation.
                </p>
                <template #footer>
                  <UButton
                    to="/docs/transformer"
                    variant="ghost"
                    size="sm"
                  >
                    Learn More
                  </UButton>
                </template>
              </UCard>

              <UCard>
                <template #title>
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-document-duplicate" class="mr-2 text-primary-500" />
                    Generator
                  </div>
                </template>
                <p>
                  The Generator component generates output files from the transformed AST, creating directories as needed and writing the generated code to files.
                </p>
                <template #footer>
                  <UButton
                    to="/docs/generator"
                    variant="ghost"
                    size="sm"
                  >
                    Learn More
                  </UButton>
                </template>
              </UCard>

              <UCard>
                <template #title>
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-play" class="mr-2 text-primary-500" />
                    Workflow Engine
                  </div>
                </template>
                <p>
                  The Workflow Engine provides a GitHub Actions-like workflow system for automating build tasks and other processes.
                </p>
                <template #footer>
                  <UButton
                    to="/docs/workflow"
                    variant="ghost"
                    size="sm"
                  >
                    Learn More
                  </UButton>
                </template>
              </UCard>

              <UCard>
                <template #title>
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-command-line" class="mr-2 text-primary-500" />
                    Task Runner
                  </div>
                </template>
                <p>
                  The Task Runner component is responsible for executing tasks defined in the build configuration.
                </p>
                <template #footer>
                  <UButton
                    to="/docs/task-runner"
                    variant="ghost"
                    size="sm"
                  >
                    Learn More
                  </UButton>
                </template>
              </UCard>

              <UCard>
                <template #title>
                  <div class="flex items-center">
                    <UIcon name="i-heroicons-chart-bar" class="mr-2 text-primary-500" />
                    Reporter
                  </div>
                </template>
                <p>
                  The Reporter component generates reports about the build process, including code analysis, build statistics, and other useful information.
                </p>
                <template #footer>
                  <UButton
                    to="/docs/reporter"
                    variant="ghost"
                    size="sm"
                  >
                    Learn More
                  </UButton>
                </template>
              </UCard>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>
