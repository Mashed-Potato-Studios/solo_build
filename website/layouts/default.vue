<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UHeader>
      <template #left>
        <UButton
          to="/"
          variant="ghost"
          class="font-bold text-xl"
        >
          <UIcon name="i-heroicons-cube-transparent" class="mr-2 text-primary-500" />
          Solo Build
        </UButton>
      </template>
      <template #right>
        <div class="flex items-center gap-4">
          <UButton
            to="/docs"
            variant="ghost"
          >
            Documentation
          </UButton>
          <UButton
            to="/features"
            variant="ghost"
          >
            Features
          </UButton>
          <UButton
            to="/examples"
            variant="ghost"
          >
            Examples
          </UButton>
          <UButton
            to="https://github.com/mashed-potato-studios/solo-build"
            target="_blank"
            variant="ghost"
          >
            <UIcon name="i-simple-icons-github" />
          </UButton>
          <UColorModeButton />
        </div>
      </template>
    </UHeader>

    <main>
      <slot />
    </main>

    <UFooter class="border-t border-gray-200 dark:border-gray-800">
      <template #left>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Solo Build. All rights reserved.
        </div>
      </template>
      <template #right>
        <div class="flex items-center gap-4">
          <UButton
            to="https://github.com/mashed-potato-studios/solo-build"
            target="_blank"
            variant="ghost"
            size="xs"
          >
            <UIcon name="i-simple-icons-github" class="mr-1" />
            GitHub
          </UButton>
          <UButton
            to="https://twitter.com/solobuild"
            target="_blank"
            variant="ghost"
            size="xs"
          >
            <UIcon name="i-simple-icons-twitter" class="mr-1" />
            Twitter
          </UButton>
          <UButton
            to="https://discord.gg/solobuild"
            target="_blank"
            variant="ghost"
            size="xs"
          >
            <UIcon name="i-simple-icons-discord" class="mr-1" />
            Discord
          </UButton>
        </div>
      </template>
    </UFooter>
  </div>
</template>
