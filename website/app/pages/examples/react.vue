<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">React Application Example</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to integrate Solo Build with your React applications for improved performance and code quality.
        </p>
      </div>

      <!-- Overview Section -->
      <div class="mb-16">
        <UCard class="mb-8">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-simple-icons-react" class="h-6 w-6 text-primary-500 mr-3" />
              <h2 class="text-2xl font-semibold">Overview</h2>
            </div>
          </template>
          <p class="mb-4">
            This example demonstrates how to use Solo Build with a React application. Solo Build can help you optimize your React code, analyze component dependencies, and improve overall performance.
          </p>
          <p>
            The example includes a simple React application with a counter component and a todo list, showcasing how Solo Build can analyze and optimize different types of React components.
          </p>
        </UCard>

        <!-- Screenshot/Preview -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-8">
          <h3 class="text-xl font-semibold mb-4">Application Preview</h3>
          <div class="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
            <div class="bg-white dark:bg-gray-900 p-6">
              <h2 class="text-2xl font-bold mb-4">React App Example with Solo Build</h2>
              <p class="mb-6">This is a simple React application demonstrating Solo Build integration.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 class="text-xl font-semibold mb-2">Counter</h3>
                  <div class="flex items-center justify-between mb-4">
                    <span class="text-lg font-medium">Count: 0</span>
                    <div class="space-x-2">
                      <UButton size="sm" color="primary">Increment</UButton>
                      <UButton size="sm" color="gray">Decrement</UButton>
                    </div>
                  </div>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 class="text-xl font-semibold mb-2">Todo List</h3>
                  <div class="flex mb-4">
                    <UInput placeholder="Add a todo" class="mr-2" />
                    <UButton size="sm" color="primary">Add</UButton>
                  </div>
                  <ul class="space-y-2">
                    <li class="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                      <span>Learn Solo Build</span>
                      <UButton size="xs" color="red" variant="soft">Delete</UButton>
                    </li>
                    <li class="flex justify-between items-center p-2 bg-white dark:bg-gray-700 rounded">
                      <span>Create React components</span>
                      <UButton size="xs" color="red" variant="soft">Delete</UButton>
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
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>react-app/
├── package.json
├── solo-build.config.js
├── src/
│   └── App.jsx
└── README.md</code></pre>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Solo Build Configuration</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>module.exports = {
  sourceDir: 'src',
  outputDir: 'dist',
  framework: 'react',
  analyze: {
    complexity: true,
    dependencies: true
  },
  workflows: {
    build: {
      steps: [
        {
          name: 'Install dependencies',
          run: 'npm install'
        },
        {
          name: 'Run tests',
          run: 'npm test'
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
            <h3 class="text-xl font-semibold">App.jsx</h3>
          </template>
          <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>import React, { useState } from 'react';

// A simple counter component
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    &lt;div className="counter"&gt;
      &lt;h2&gt;Counter: {count}&lt;/h2&gt;
      &lt;button onClick={function() { setCount(count + 1); }}&gt;Increment&lt;/button&gt;
      &lt;button onClick={function() { setCount(count - 1); }}&gt;Decrement&lt;/button&gt;
    &lt;/div&gt;
  );
}

// A todo item component
function TodoItem({ text, onDelete }) {
  return (
    &lt;div className="todo-item"&gt;
      &lt;span&gt;{text}&lt;/span&gt;
      &lt;button onClick={function() { onDelete(); }}&gt;Delete&lt;/button&gt;
    &lt;/div&gt;
  );
}

// A todo list component
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput('');
    }
  };
  
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  
  return (
    &lt;div className="todo-list"&gt;
      &lt;h2&gt;Todo List&lt;/h2&gt;
      &lt;div&gt;
        &lt;input 
          value={input} 
          onChange={function(e) { setInput(e.target.value); }} 
          placeholder="Add a todo"
        /&gt;
        &lt;button onClick={function() { addTodo(); }}&gt;Add&lt;/button&gt;
      &lt;/div&gt;
      &lt;div&gt;
        {todos.map((todo, index) =&gt; (
          &lt;TodoItem 
            key={index} 
            text={todo} 
            onDelete={function() { deleteTodo(index); }} 
          /&gt;
        ))}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

// Main App component
function App() {
  return (
    &lt;div className="app"&gt;
      &lt;h1&gt;React App Example with Solo Build&lt;/h1&gt;
      &lt;p&gt;This is a simple React application demonstrating Solo Build integration.&lt;/p&gt;
      
      &lt;div className="components"&gt;
        &lt;Counter /&gt;
        &lt;TodoList /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  );
}

export default App;</code></pre>
        </UCard>
      </div>

      <!-- Solo Build Benefits -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Solo Build Benefits for React</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Component Analysis</h3>
            </template>
            <p class="mb-4">
              Solo Build analyzes your React components to identify complex components that might need refactoring.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Detects deeply nested components</li>
              <li>Identifies components with too many props</li>
              <li>Suggests component splitting strategies</li>
            </ul>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Dependency Tracking</h3>
            </template>
            <p class="mb-4">
              Track dependencies between components and external packages to maintain a clean architecture.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Maps component relationships</li>
              <li>Identifies unused dependencies</li>
              <li>Suggests dependency optimizations</li>
            </ul>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Performance Optimization</h3>
            </template>
            <p class="mb-4">
              Improve your React application's performance with Solo Build's optimization suggestions.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Identifies re-render issues</li>
              <li>Suggests memoization opportunities</li>
              <li>Optimizes bundle size</li>
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
            Follow these steps to integrate Solo Build with your React application:
          </p>
          <ol class="list-decimal list-inside space-y-2 mb-6">
            <li class="pl-2">
              <span class="font-semibold">Install Solo Build:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">npm install -g solo-build</pre>
            </li>
            <li class="pl-2">
              <span class="font-semibold">Initialize Solo Build in your project:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">solo-build init --framework react</pre>
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
            to="https://github.com/Mashed-Potato-Studios/solo_build/tree/main/examples/react-app"
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
          to="/examples"
          variant="ghost"
          icon="i-heroicons-arrow-left"
        >
          Back to Examples
        </UButton>
        <UButton
          to="/examples/vue"
          color="primary"
          trailing-icon="i-heroicons-arrow-right"
        >
          Next: Vue.js Example
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for this example page
</script>
