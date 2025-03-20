<script setup lang="ts">
import Logo from '~/components/Logo.vue';
const route = useRoute();
const items = computed(() => {
  return [
    {
      label: 'Documentation',
      href: '/docs'
    },
    {
      label: 'Features',
      href: '/features'
    },
    {
      label: 'Examples',
      href: '/examples'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UHeader class="dark:bg-black" mode="slideover">
      <template #left>
        <UButton
          to="/"
          variant="ghost"
          class="font-bold text-xl"
        >
          <Logo />
        </UButton>
      </template>
      <UNavigationMenu :items="items" />
      <template #right>
          <UButton
            to="https://github.com/mashed-potato-studios/solo_build"
            target="_blank"
            variant="ghost"
            size="lg"
            class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <UIcon name="i-simple-icons-github" class="h-4 w-4" />
          </UButton>
          <UColorModeButton />
      </template>
      <template #body>
        <UNavigationMenu :items="items" orientation="vertical"/>
      </template>
    </UHeader>

    <main>
      <slot />
    </main>

    <UFooter class="border-t border-gray-200 dark:border-gray-800 py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <!-- Learn Section -->
          <div>
            <h3 class="font-bold text-lg mb-4">Learn</h3>
            <ul class="space-y-2">
              <li><ULink to="/docs/getting-started" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Getting Started</ULink></li>
              <li><ULink to="/docs/configuration" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Configuration</ULink></li>
              <li><ULink to="/docs/workflows" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Workflows</ULink></li>
              <li><ULink to="/docs/ai-features" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">AI Features</ULink></li>
            </ul>
          </div>

          <!-- Popular Section -->
          <div>
            <h3 class="font-bold text-lg mb-4">Popular</h3>
            <ul class="space-y-2">
              <li><ULink to="/docs/typescript" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">TypeScript Support</ULink></li>
              <li><ULink to="/docs/javascript" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">JavaScript Support</ULink></li>
              <li><ULink to="/docs/ci-integration" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">CI Integration</ULink></li>
              <li><ULink to="/docs/plugins" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Plugins</ULink></li>
            </ul>
          </div>

          <!-- Tools Section -->
          <div>
            <h3 class="font-bold text-lg mb-4">Tools</h3>
            <ul class="space-y-2">
              <li><ULink to="/tools/analyzer" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Code Analyzer</ULink></li>
              <li><ULink to="/tools/parser" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Parser</ULink></li>
              <li><ULink to="/tools/workflow-editor" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Workflow Editor</ULink></li>
              <li><ULink to="/tools/ai-assistant" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">AI Assistant</ULink></li>
            </ul>
          </div>

          <!-- Company Section -->
          <div>
            <h3 class="font-bold text-lg mb-4">Company</h3>
            <ul class="space-y-2">
              <li><ULink to="/about" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">About Us</ULink></li>
              <li><ULink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Blog</ULink></li>
              <li><ULink to="/careers" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Careers</ULink></li>
              <li><ULink to="/contact" class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Contact</ULink></li>
            </ul>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="flex justify-center space-x-6 mb-8">
          <UButton
            to="https://github.com/mashed-potato-studios/solo_build"
            target="_blank"
            variant="ghost"
            size="sm"
            class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <UIcon name="i-simple-icons-github" class="h-6 w-6" />
          </UButton>
          <UButton
            to="https://mashedpotatostudios.com"
            target="_blank"
            variant="ghost"
            size="xl"
            class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <NuxtImg src="/images/logo.png" alt="MPS" width="40" height="40" class="h-10 w-10" />
          </UButton>
          <!-- <UButton
            to="https://discord.gg/solobuild"
            target="_blank"
            variant="ghost"
            size="sm"
            class="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <UIcon name="i-simple-icons-discord" class="h-6 w-6" />
          </UButton> -->
        </div>

        <!-- Large Solo Build Text -->
        <div class="mb-12 text-center">
          <h1 class="text-[200px] md:text-[400px] font-bold text-gray-100 dark:text-gray-800 leading-none select-none opacity-80">
            solo build
          </h1>
        </div>

        <!-- Bottom Bar with Copyright -->
        <div class="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <Logo class="transform scale-75" />
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ new Date().getFullYear() }} Solo Build. All rights reserved.
          </div>
        </div>
      </div>
    </UFooter>
  </div>
</template>
