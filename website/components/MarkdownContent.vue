<template>
  <div class="markdown-content prose dark:prose-invert max-w-none">
    <ContentRenderer v-if="data" :value="data" />
    <UAlert v-else title="Content not found" color="red">
      The requested documentation could not be found.
    </UAlert>
  </div>
</template>

<script setup>
import { useRoute } from 'nuxt/app';
import { computed } from 'vue';
import { useContent } from '#nuxt/content';

defineProps({
  data: {
    type: Object,
    default: null
  }
});
</script>

<style>
.markdown-content h1 {
  @apply text-3xl font-bold mb-6;
}

.markdown-content h2 {
  @apply text-2xl font-bold mt-8 mb-4;
}

.markdown-content h3 {
  @apply text-xl font-semibold mt-6 mb-3;
}

.markdown-content p {
  @apply mb-4;
}

.markdown-content ul, .markdown-content ol {
  @apply mb-4 ml-6;
}

.markdown-content ul {
  @apply list-disc;
}

.markdown-content ol {
  @apply list-decimal;
}

.markdown-content li {
  @apply mb-1;
}

.markdown-content code {
  @apply px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm;
}

.markdown-content pre {
  @apply p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto mb-4;
}

.markdown-content pre code {
  @apply bg-transparent p-0;
}

.markdown-content blockquote {
  @apply pl-4 border-l-4 border-gray-300 dark:border-gray-700 italic;
}

.markdown-content table {
  @apply w-full border-collapse mb-4;
}

.markdown-content table th {
  @apply py-2 px-4 bg-gray-100 dark:bg-gray-800 text-left border border-gray-300 dark:border-gray-700;
}

.markdown-content table td {
  @apply py-2 px-4 border border-gray-300 dark:border-gray-700;
}

.markdown-content a {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}
</style>
