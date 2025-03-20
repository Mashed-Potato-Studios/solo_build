export default defineAppConfig({
  ui: {
    primary: 'purple',
    gray: 'slate',
    card: {
      base: 'overflow-hidden',
      rounded: 'rounded-xl',
      shadow: 'shadow-lg',
      body: {
        padding: 'p-5 sm:p-6'
      }
    },
    button: {
      rounded: 'rounded-lg',
      default: {
        size: 'md',
        color: 'primary'
      }
    },
    badge: {
      rounded: 'rounded-full',
      default: {
        size: 'sm',
        color: 'primary'
      }
    },
    header: {
      wrapper: 'bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800',
      height: 'h-16'
    },
    footer: {
      wrapper: 'bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800'
    }
  }
})