<template>
  <div class="py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Node.js Library Example</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Learn how to integrate Solo Build with your Node.js libraries for optimal compatibility and performance.
        </p>
      </div>

      <!-- Overview Section -->
      <div class="mb-16">
        <UCard class="mb-8">
          <template #header>
            <div class="flex items-center">
              <UIcon name="i-simple-icons-nodedotjs" class="h-6 w-6 text-primary-500 mr-3" />
              <h2 class="text-2xl font-semibold">Overview</h2>
            </div>
          </template>
          <p class="mb-4">
            This example demonstrates how to use Solo Build with a Node.js library. Solo Build can help you analyze your code, optimize your package, and generate multiple output formats.
          </p>
          <p>
            The example includes a simple Node.js library with a calculator module, string utilities, and file management functions, showcasing how Solo Build can analyze and optimize different types of modules.
          </p>
        </UCard>

        <!-- Library Preview -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 mb-8">
          <h3 class="text-xl font-semibold mb-4">Library Preview</h3>
          <div class="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
            <div class="bg-white dark:bg-gray-900 p-6">
              <h2 class="text-2xl font-bold mb-4">Solo Build Node.js Library</h2>
              <p class="mb-6">A utility library with multiple modules for common operations.</p>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 class="text-xl font-semibold mb-2">Calculator</h3>
                  <ul class="text-sm space-y-1">
                    <li><code>add(a, b)</code> - Add two numbers</li>
                    <li><code>subtract(a, b)</code> - Subtract numbers</li>
                    <li><code>multiply(a, b)</code> - Multiply numbers</li>
                    <li><code>divide(a, b)</code> - Divide numbers</li>
                    <li><code>power(a, b)</code> - Calculate power</li>
                  </ul>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 class="text-xl font-semibold mb-2">String Utils</h3>
                  <ul class="text-sm space-y-1">
                    <li><code>capitalize(str)</code> - Capitalize words</li>
                    <li><code>reverse(str)</code> - Reverse string</li>
                    <li><code>countOccurrences(str, substr)</code> - Count substring occurrences</li>
                    <li><code>truncate(str, maxLength)</code> - Truncate string</li>
                    <li><code>toCamelCase(str)</code> - Convert to camelCase</li>
                  </ul>
                </div>
                
                <div class="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h3 class="text-xl font-semibold mb-2">File Manager</h3>
                  <ul class="text-sm space-y-1">
                    <li><code>readFile(filePath)</code> - Read file contents</li>
                    <li><code>writeFile(filePath, content)</code> - Write to file</li>
                    <li><code>fileExists(filePath)</code> - Check if file exists</li>
                    <li><code>createDirectory(dirPath)</code> - Create directory</li>
                    <li><code>listFiles(dirPath)</code> - List files in directory</li>
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
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>node-lib/
├── package.json
├── solo-build.config.js
├── src/
│   ├── index.ts
│   ├── calculator.ts
│   ├── stringUtils.ts
│   └── fileManager.ts
└── README.md</code></pre>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Solo Build Configuration</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>module.exports = {
  sourceDir: 'src',
  outputDir: 'dist',
  framework: 'node',
  analyze: {
    complexity: true,
    dependencies: true,
    issues: true
  },
  output: {
    formats: ['cjs', 'esm'],
    dts: true
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
          name: 'Build library',
          run: 'npm run build'
        }
      ]
    }
  }
}</code></pre>
          </UCard>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">index.ts</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>/**
 * Solo Build Node.js Library Example
 * 
 * This library demonstrates a simple utility package with several modules:
 * - Calculator: Basic arithmetic operations
 * - StringUtils: String manipulation utilities
 * - FileManager: File system operations
 */

export * from './calculator';
export * from './stringUtils';
export * from './fileManager';</code></pre>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">calculator.ts</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>/**
 * Calculator module providing basic arithmetic operations
 */

export class Calculator {
  /**
   * Add two numbers
   * @param a First number
   * @param b Second number
   * @returns Sum of a and b
   */
  static add(a: number, b: number): number {
    return a + b;
  }

  /**
   * Subtract b from a
   * @param a First number
   * @param b Second number
   * @returns Difference of a and b
   */
  static subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * Multiply two numbers
   * @param a First number
   * @param b Second number
   * @returns Product of a and b
   */
  static multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * Divide a by b
   * @param a First number
   * @param b Second number
   * @returns Quotient of a and b
   * @throws Error if b is zero
   */
  static divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }

  /**
   * Calculate the power of a raised to b
   * @param a Base
   * @param b Exponent
   * @returns a raised to the power of b
   */
  static power(a: number, b: number): number {
    return Math.pow(a, b);
  }
}</code></pre>
          </UCard>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">stringUtils.ts</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>/**
 * String utility functions for common string operations
 */

export class StringUtils {
  /**
   * Capitalize the first letter of each word in a string
   * @param str Input string
   * @returns String with first letter of each word capitalized
   */
  static capitalize(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  /**
   * Reverse a string
   * @param str Input string
   * @returns Reversed string
   */
  static reverse(str: string): string {
    return str.split('').reverse().join('');
  }

  /**
   * Count the occurrences of a substring in a string
   * @param str Input string
   * @param substr Substring to count
   * @returns Number of occurrences
   */
  static countOccurrences(str: string, substr: string): number {
    if (!substr) return 0;
    return (str.match(new RegExp(substr, 'g')) || []).length;
  }

  /**
   * Truncate a string to a maximum length and add ellipsis if truncated
   * @param str Input string
   * @param maxLength Maximum length
   * @returns Truncated string
   */
  static truncate(str: string, maxLength: number): string {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  }

  /**
   * Convert a string to camelCase
   * @param str Input string
   * @returns camelCase string
   */
  static toCamelCase(str: string): string {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
      .replace(/^[A-Z]/, firstChar => firstChar.toLowerCase());
  }
}</code></pre>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">fileManager.ts</h3>
            </template>
            <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>/**
 * File manager module for common file system operations
 */

import * as fs from 'fs';
import * as path from 'path';

export class FileManager {
  /**
   * Read a file and return its contents
   * @param filePath Path to the file
   * @returns File contents as string
   */
  static readFile(filePath: string): Promise&lt;string&gt; {
    return fs.promises.readFile(filePath, 'utf-8');
  }

  /**
   * Write content to a file
   * @param filePath Path to the file
   * @param content Content to write
   */
  static writeFile(filePath: string, content: string): Promise&lt;void&gt; {
    return fs.promises.writeFile(filePath, content, 'utf-8');
  }

  /**
   * Check if a file exists
   * @param filePath Path to the file
   * @returns True if the file exists, false otherwise
   */
  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Create a directory if it doesn't exist
   * @param dirPath Path to the directory
   */
  static createDirectory(dirPath: string): Promise&lt;void&gt; {
    return fs.promises.mkdir(dirPath, { recursive: true });
  }

  /**
   * List all files in a directory
   * @param dirPath Path to the directory
   * @returns Array of file names
   */
  static listFiles(dirPath: string): Promise&lt;string[]&gt; {
    return fs.promises.readdir(dirPath);
  }
}</code></pre>
          </UCard>
        </div>
      </div>

      <!-- Solo Build Benefits -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Solo Build Benefits for Node.js</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Multi-Format Output</h3>
            </template>
            <p class="mb-4">
              Solo Build can generate multiple output formats for your Node.js library, ensuring compatibility with different module systems.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>CommonJS (CJS) for Node.js</li>
              <li>ES Modules (ESM) for modern environments</li>
              <li>TypeScript declaration files (d.ts)</li>
            </ul>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Code Analysis</h3>
            </template>
            <p class="mb-4">
              Analyze your Node.js library code for complexity, dependencies, and potential issues.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Function complexity metrics</li>
              <li>Module dependency graph</li>
              <li>Code quality suggestions</li>
            </ul>
          </UCard>
          
          <UCard>
            <template #header>
              <h3 class="text-xl font-semibold">Package Optimization</h3>
            </template>
            <p class="mb-4">
              Optimize your Node.js library package for size and performance.
            </p>
            <ul class="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>Tree-shaking for smaller bundles</li>
              <li>Dead code elimination</li>
              <li>Package size analysis</li>
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
            Follow these steps to integrate Solo Build with your Node.js library:
          </p>
          <ol class="list-decimal list-inside space-y-2 mb-6">
            <li class="pl-2">
              <span class="font-semibold">Install Solo Build:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">npm install -g solo-build</pre>
            </li>
            <li class="pl-2">
              <span class="font-semibold">Initialize Solo Build in your project:</span>
              <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-2 rounded-md mt-2">solo-build init --framework node</pre>
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
            to="https://github.com/Mashed-Potato-Studios/solo_build/tree/main/examples/node-lib"
            target="_blank"
            color="primary"
          >
            View Full Example on GitHub
          </UButton>
        </UCard>
      </div>

      <!-- Usage Example -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold mb-8">Usage Example</h2>
        <UCard>
          <template #header>
            <h3 class="text-xl font-semibold">How to Use the Library</h3>
          </template>
          <pre class="text-sm bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-x-auto"><code>import { Calculator, StringUtils, FileManager } from 'solo-build-node-example';

// Using the Calculator
const sum = Calculator.add(5, 3);
console.log(`5 + 3 = ${sum}`);

const product = Calculator.multiply(4, 2);
console.log(`4 * 2 = ${product}`);

// Using StringUtils
const capitalized = StringUtils.capitalize('hello world');
console.log(capitalized); // "Hello World"

const camelCase = StringUtils.toCamelCase('convert to camel case');
console.log(camelCase); // "convertToCamelCase"

// Using FileManager
async function readAndWriteFile() {
  // Create a directory
  await FileManager.createDirectory('./output');
  
  // Write to a file
  await FileManager.writeFile('./output/example.txt', 'Hello from Solo Build!');
  
  // Read the file
  const content = await FileManager.readFile('./output/example.txt');
  console.log(content); // "Hello from Solo Build!"
  
  // List files in directory
  const files = await FileManager.listFiles('./output');
  console.log(files); // ["example.txt"]
}

readAndWriteFile().catch(console.error);</code></pre>
        </UCard>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <UButton
          to="/examples/vue"
          variant="ghost"
          icon="i-heroicons-arrow-left"
        >
          Previous: Vue.js Example
        </UButton>
        <UButton
          to="/examples"
          color="primary"
          trailing-icon="i-heroicons-arrow-right"
        >
          Back to Examples
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed for this example page
</script>
