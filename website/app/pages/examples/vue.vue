<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Vue.js Application Example</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to integrate Solo Build with your Vue.js applications for improved maintainability and performance.
        </p>
      </div>

      <!-- Overview Section -->
      <div class="mb-16">
        <UCard class="mb-8">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-simple-icons-vuedotjs" class="h-6 w-6 text-primary-500 mr-3" />
              <h2 class="text-2xl font-semibold">Overview</h2>
            </div>
          </template>
          <p class="mb-4">
            This example demonstrates how to use Solo Build with a Vue.js application. Solo Build can help you analyze Vue components, optimize templates, and improve overall code quality.
          </p>
          <p>
            The example includes a simple Vue.js application with a counter component and a task manager, showcasing how Solo Build can analyze and optimize different types of Vue components.
          </p>
        </UCard>

        <!-- Screenshot/Preview -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-8">
          <h3 class="text-xl font-semibold mb-4">Application Preview</h3>
          <div class="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
            <div class="bg-white dark:bg-gray-900 p-6">
              <h2 class="text-2xl font-bold mb-4">Vue.js App Example with Solo Build</h2>
              <p class="mb-6">This is a simple Vue.js application demonstrating Solo Build integration.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 class="text-xl font-semibold mb-2">Counter</h3>
                  <div class="flex flex-col items-center">
                    <p class="text-lg font-medium mb-4">Count: 0</p>
                    <div class="flex space-x-2">
                      <UButton size="sm" color="primary">Increment</UButton>
                      <UButton size="sm" color="gray">Decrement</UButton>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 class="text-xl font-semibold mb-2">Task Manager</h3>
                  <div class="flex mb-4">
                    <UInput placeholder="Add a new task" class="mr-2" />
                    <UButton size="sm" color="primary">Add</UButton>
                  </div>
                  <ul class="space-y-2">
                    <li class="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                      <span>Learn Solo Build</span>
                      <div class="flex space-x-1">
                        <UButton size="xs" color="primary" variant="soft">Complete</UButton>
                        <UButton size="xs" color="red" variant="soft">Delete</UButton>
                      </div>
                    </li>
                    <li class="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                      <span class="line-through text-gray-500">Create a Vue.js app</span>
                      <div class="flex space-x-1">
                        <UButton size="xs" color="gray" variant="soft">Undo</UButton>
                        <UButton size="xs" color="red" variant="soft">Delete</UButton>
                      </div>
                    </li>
                    <li class="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                      <span>Implement AI features</span>
                      <div class="flex space-x-1">
                        <UButton size="xs" color="primary" variant="soft">Complete</UButton>
                        <UButton size="xs" color="red" variant="soft">Delete</UButton>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Implementation Details -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Implementation Details</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Project Structure</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>vue-app/
├── package.json
├── solo-build.config.js
├── src/
│   ├── App.vue
│   └── components/
│       ├── Counter.vue
│       └── TaskManager.vue
└── README.md</code></pre>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Solo Build Configuration</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>module.exports = {
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
}</code></pre>
          </UCard>
        </div>
        
        <UCard class="mb-8">
          <template #header>
            <h3 class="text-xl font-semibold">App.vue</h3>
          </template>
          <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>&lt;template&gt;
  &lt;div class="app"&gt;
    &lt;h1&gt;Vue.js App Example with Solo Build&lt;/h1&gt;
    &lt;p&gt;This is a simple Vue.js application demonstrating Solo Build integration.&lt;/p&gt;
    
    &lt;div class="components"&gt;
      &lt;Counter /&gt;
      &lt;TaskManager /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Counter from './components/Counter.vue';
import TaskManager from './components/TaskManager.vue';

export default {
  name: 'App',
  components: {
    Counter,
    TaskManager
  }
}
&lt;/script&gt;

&lt;style scoped&gt;
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.components {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  margin: 0 auto;
}
&lt;/style&gt;</code></pre>
        </UCard>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Counter.vue</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>&lt;template&gt;
  &lt;div class="counter"&gt;
    &lt;h2&gt;Counter&lt;/h2&gt;
    &lt;p&gt;Count: &#123;&#123; count &#125;&#125;&lt;/p&gt;
    &lt;div class="buttons"&gt;
      &lt;button @click="increment"&gt;Increment&lt;/button&gt;
      &lt;button @click="decrement"&gt;Decrement&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'Counter',
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
}
&lt;/script&gt;

&lt;style scoped&gt;
.counter {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
}

button {
  background-color: #7e3af2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #6929c4;
}
&lt;/style&gt;</code></pre>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">TaskManager.vue</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>&lt;template&gt;
  &lt;div class="task-manager"&gt;
    &lt;h2&gt;Task Manager&lt;/h2&gt;
    &lt;div class="add-task"&gt;
      &lt;input 
        v-model="newTask" 
        @keyup.enter="addTask" 
        placeholder="Add a new task"
      /&gt;
      &lt;button @click="addTask"&gt;Add&lt;/button&gt;
    &lt;/div&gt;
    &lt;ul class="task-list"&gt;
      &lt;li v-for="(task, index) in tasks" :key="index" class="task-item"&gt;
        &lt;span :class="{ completed: task.completed }"&gt;&#123;&#123; task.text &#125;&#125;&lt;/span&gt;
        &lt;div class="task-actions"&gt;
          &lt;button @click="toggleTask(index)" class="toggle-btn"&gt;
            &#123;&#123; task.completed ? 'Undo' : 'Complete' &#125;&#125;
          &lt;/button&gt;
          &lt;button @click="removeTask(index)" class="delete-btn"&gt;Delete&lt;/button&gt;
        &lt;/div&gt;
      &lt;/li&gt;
    &lt;/ul&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: 'TaskManager',
  data() {
    return {
      newTask: '',
      tasks: [
        { text: 'Learn Solo Build', completed: false },
        { text: 'Create a Vue.js app', completed: true },
        { text: 'Implement AI features', completed: false }
      ]
    }
  },
  methods: {
    addTask() {
      if (this.newTask.trim()) {
        this.tasks.push({
          text: this.newTask,
          completed: false
        })
        this.newTask = ''
      }
    },
    toggleTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    }
  }
}
&lt;/script&gt;</code></pre>
          </UCard>
        </div>
      </div>

      <!-- Solo Build Benefits -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Solo Build Benefits for Vue.js</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">SFC Analysis</h3>
            </template>
            <p class="mb-4">
              Solo Build analyzes your Vue Single File Components to identify potential issues and optimization opportunities.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Template complexity analysis</li>
              <li>Script and style optimization</li>
              <li>Component relationship mapping</li>
            </ul>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Performance Optimization</h3>
            </template>
            <p class="mb-4">
              Improve your Vue.js application's performance with Solo Build's optimization suggestions.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Reactive property optimization</li>
              <li>Computed property suggestions</li>
              <li>Template rendering optimization</li>
            </ul>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Code Quality</h3>
            </template>
            <p class="mb-4">
              Maintain high code quality with Solo Build's analysis and suggestions.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Vue best practices enforcement</li>
              <li>Component reusability analysis</li>
              <li>Prop validation suggestions</li>
            </ul>
          </UCard>
        </div>
      </div>

      <!-- Getting Started -->
      <div class="mb-16">
        <UCard>
          <template #header>
            <h2 class="text-2xl font-semibold">Getting Started</h2>
          </template>
          <p class="mb-4">
            Follow these steps to integrate Solo Build with your Vue.js application:
          </p>
          <ol class="list-decimal list-inside space-y-2 mb-6">
            <li class="pl-2">
              <span class="font-semibold">Install Solo Build:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">npm install -g solo-build</pre>
            </li>
            <li class="pl-2">
              <span class="font-semibold">Initialize Solo Build in your project:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">solo-build init --framework vue</pre>
            </li>
            <li class="pl-2">
              <span class="font-semibold">Add the Solo Build script to your package.json:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">"scripts": {
  "solo-build": "solo-build run"
}</pre>
            </li>
            <li class="pl-2">
              <span class="font-semibold">Run Solo Build:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">npm run solo-build</pre>
            </li>
          </ol>
          <UButton
            to="https://github.com/Mashed-Potato-Studios/solo_build/tree/main/examples/vue-app"
            target="_blank"
            color="primary"
          >
            View Full Example on GitHub
          </UButton>
        </UCard>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <UButton
          to="/examples/react"
          variant="ghost"
          icon="i-heroicons-arrow-left"
        >
          Previous: React Example
        </UButton>
        <UButton
          to="/examples/node"
          color="primary"
          trailing-icon="i-heroicons-arrow-right"
        >
          Next: Node.js Example
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for this example page
</script>
