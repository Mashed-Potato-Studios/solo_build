<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Left Sidebar - Navigation -->
        <div class="md:col-span-1">
          <UCard>
            <template #header>
              <h3 class="text-lg font-semibold">Documentation</h3>
            </template>
            <div class="space-y-2">
              <UButton
                to="/docs"
                block
                variant="ghost"
                class="justify-start"
              >
                Overview
              </UButton>
              <UButton
                to="/docs/getting-started"
                block
                variant="ghost"
                class="justify-start"
              >
                Getting Started
              </UButton>
              <UButton
                to="/docs/configuration"
                block
                variant="ghost"
                class="justify-start"
              >
                Configuration
              </UButton>
              <h4 class="font-medium text-sm text-gray-500 dark:text-gray-400 py-2 px-3">
                Core Components
              </h4>
              <UButton
                to="/docs/parser"
                block
                variant="ghost"
                class="justify-start"
                :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400': isActive('parser') }"
              >
                Parser
              </UButton>
              <UButton
                to="/docs/analyzer"
                block
                variant="ghost"
                class="justify-start"
                :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400': isActive('analyzer') }"
              >
                Analyzer
              </UButton>
              <UButton
                to="/docs/transformer"
                block
                variant="ghost"
                class="justify-start"
                :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400': isActive('transformer') }"
              >
                Transformer
              </UButton>
              <UButton
                to="/docs/generator"
                block
                variant="ghost"
                class="justify-start"
                :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400': isActive('generator') }"
              >
                Generator
              </UButton>
              <UButton
                to="/docs/workflow"
                block
                variant="ghost"
                class="justify-start"
                :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400': isActive('workflow') }"
              >
                Workflow Engine
              </UButton>
              <UButton
                to="/docs/task-runner"
                block
                variant="ghost"
                class="justify-start"
                :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400': isActive('task-runner') }"
              >
                Task Runner
              </UButton>
              <UButton
                to="/docs/reporter"
                block
                variant="ghost"
                class="justify-start"
                :class="{ 'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-400': isActive('reporter') }"
              >
                Reporter
              </UButton>
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
        <div class="md:col-span-3">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-2xl font-bold">{{ page?.title || 'Documentation' }}</h2>
                <UButton
                  v-if="editUrl"
                  :to="editUrl"
                  target="_blank"
                  variant="ghost"
                  size="xs"
                >
                  <UIcon name="i-heroicons-pencil-square" class="mr-1" />
                  Edit on GitHub
                </UButton>
              </div>
            </template>
            
            <div v-if="pending" class="flex justify-center py-8">
              <UIcon name="i-heroicons-arrow-path" class="animate-spin h-8 w-8 text-primary-500" />
            </div>
            
            <div v-else-if="error">
              <UAlert
                title="Error loading documentation"
                color="red"
                variant="soft"
                icon="i-heroicons-exclamation-triangle"
              >
                {{ error }}
              </UAlert>
              <div class="mt-4">
                <p>You can try:</p>
                <ul class="list-disc list-inside mt-2">
                  <li>Refreshing the page</li>
                  <li>Going back to the <UButton to="/docs" variant="link">documentation index</UButton></li>
                  <li>Checking if the documentation file exists</li>
                </ul>
              </div>
            </div>
            
            <div v-else>
              <ContentRenderer v-if="page" :value="page" class="prose dark:prose-invert max-w-none" />
              <UAlert v-else title="Documentation not found" color="yellow" variant="soft" icon="i-heroicons-exclamation-triangle">
                The requested documentation page could not be found.
              </UAlert>
            </div>
            
            <template #footer v-if="page">
              <div class="flex justify-between items-center">
                <UButton
                  v-if="prevPage"
                  :to="prevPage.path"
                  variant="ghost"
                  size="sm"
                >
                  <UIcon name="i-heroicons-arrow-left" class="mr-1" />
                  {{ prevPage.title }}
                </UButton>
                <div v-else></div>
                
                <UButton
                  v-if="nextPage"
                  :to="nextPage.path"
                  variant="ghost"
                  size="sm"
                >
                  {{ nextPage.title }}
                  <UIcon name="i-heroicons-arrow-right" class="ml-1" />
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { data: page, pending, error } = await useAsyncData(
  `docs-${route.path}`,
  () => queryCollection('docs').path(route.path).first()
);

console.log(page.value);

// Navigation structure
const docPages = [
  { path: '/docs', title: 'Overview' },
  { path: '/docs/getting-started', title: 'Getting Started' },
  { path: '/docs/configuration', title: 'Configuration' },
  { path: '/docs/parser', title: 'Parser' },
  { path: '/docs/analyzer', title: 'Analyzer' },
  { path: '/docs/transformer', title: 'Transformer' },
  { path: '/docs/generator', title: 'Generator' },
  { path: '/docs/workflow', title: 'Workflow Engine' },
  { path: '/docs/task-runner', title: 'Task Runner' },
  { path: '/docs/reporter', title: 'Reporter' },
  { path: '/docs/cli/run', title: 'Run Command' },
  { path: '/docs/cli/init', title: 'Init Command' },
  { path: '/docs/cli/analyze', title: 'Analyze Command' },
  { path: '/docs/cli/workflow', title: 'Workflow Command' },
];

// Get current page index
const currentPageIndex = computed(() => {
  return docPages.findIndex(page => page.path === route.path);
});

// Get previous and next pages
const prevPage = computed(() => {
  if (currentPageIndex.value > 0) {
    return docPages[currentPageIndex.value - 1];
  }
  return null;
});

const nextPage = computed(() => {
  if (currentPageIndex.value < docPages.length - 1) {
    return docPages[currentPageIndex.value + 1];
  }
  return null;
});

// GitHub edit URL
const editUrl = computed(() => {
  if (!route.params.slug) return null;
  
  const slug = Array.isArray(route.params.slug) 
    ? route.params.slug.join('/') 
    : route.params.slug;
    
  return `https://github.com/mashed-potato-studios/solo-build/edit/main/docs/${slug}.md`;
});

// Check if current route matches a specific doc
function isActive(docName) {
  if (!route.params.slug) return false;
  
  const slug = Array.isArray(route.params.slug) 
    ? route.params.slug[route.params.slug.length - 1] 
    : route.params.slug;
    
  return slug === docName;
}
</script>
