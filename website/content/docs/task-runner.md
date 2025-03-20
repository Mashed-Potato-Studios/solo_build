---
title: Task Runner
description: Learn about the Task Runner component that handles task execution models, error handling, and monitoring
---

# Task Runner

The Task Runner is a core component of the Solo Build system that executes tasks defined in workflows, build processes, and other automation scenarios.

## Overview

The Task Runner provides a flexible and efficient way to execute tasks in sequence or parallel, with support for dependencies, conditions, and error handling. It's the execution engine behind the Workflow system and is also used internally by other Solo Build components.

## Features

### Task Execution Models

The Task Runner supports multiple execution models:

- **Sequential Execution**: Run tasks one after another in a defined order
- **Parallel Execution**: Run multiple tasks concurrently for better performance
- **Dependency-based Execution**: Automatically determine execution order based on task dependencies
- **Conditional Execution**: Run tasks only when specific conditions are met

### Task Types

The Task Runner can execute various types of tasks:

- **Command Tasks**: Execute shell commands
- **Function Tasks**: Run JavaScript/TypeScript functions
- **Plugin Tasks**: Execute tasks provided by plugins
- **Workflow Tasks**: Run entire workflows as tasks
- **Group Tasks**: Organize tasks into logical groups

### Error Handling

The Task Runner includes robust error handling:

- **Error Recovery**: Continue execution even when some tasks fail
- **Retry Mechanism**: Automatically retry failed tasks
- **Fallback Tasks**: Define alternative tasks to run when primary tasks fail
- **Error Reporting**: Detailed error information for debugging

### Monitoring and Reporting

The Task Runner provides comprehensive monitoring:

- **Real-time Status**: Monitor task execution in real-time
- **Progress Reporting**: Track overall progress of task execution
- **Performance Metrics**: Measure execution time and resource usage
- **Logging**: Detailed logs of task execution

## Usage

### Basic Usage

The Task Runner is used internally by the Workflow Engine and other components, but you can also use it directly in your code:

```typescript
import { TaskRunner } from '@solo-build/task-runner';

// Create a task runner instance
const runner = new TaskRunner();

// Define tasks
const tasks = [
  {
    name: 'clean',
    command: 'rimraf dist'
  },
  {
    name: 'build',
    command: 'tsc',
    dependencies: ['clean']
  },
  {
    name: 'test',
    command: 'jest',
    dependencies: ['build']
  }
];

// Run tasks
const results = await runner.runTasks(tasks);
console.log(results);
```

### Configuration

You can configure the Task Runner in your `solo-build.config.js` file:

```javascript
module.exports = {
  // ... other configuration options
  taskRunner: {
    concurrency: 4,         // Maximum number of concurrent tasks
    timeout: 60000,         // Default timeout in milliseconds
    retries: 3,             // Number of retries for failed tasks
    retryDelay: 1000,       // Delay between retries in milliseconds
    shell: true,            // Run commands in a shell
    environmentVariables: { // Default environment variables
      NODE_ENV: 'production'
    }
  }
};
```

### Programmatic API

The Task Runner provides a comprehensive API for task management:

```typescript
import { TaskRunner } from '@solo-build/task-runner';

// Create a task runner with options
const runner = new TaskRunner({
  concurrency: 2,
  timeout: 30000
});

// Add tasks
runner.addTask({
  name: 'build',
  command: 'tsc'
});

runner.addTask({
  name: 'test',
  command: 'jest',
  dependencies: ['build']
});

// Run specific tasks
await runner.runTask('build');

// Run all tasks
const results = await runner.runAllTasks();

// Get task status
const status = runner.getTaskStatus('build');
console.log(status);

// Listen for events
runner.on('taskStart', (task) => {
  console.log(`Task ${task.name} started`);
});

runner.on('taskComplete', (task, result) => {
  console.log(`Task ${task.name} completed with status: ${result.status}`);
});
```

## Task Definition

Tasks can be defined with various options:

```typescript
interface Task {
  // Basic properties
  name: string;                      // Unique task name
  description?: string;              // Task description
  
  // Execution options
  command?: string;                  // Shell command to execute
  function?: Function;               // JavaScript function to execute
  plugin?: string;                   // Plugin task to execute
  workflow?: string;                 // Workflow to execute
  
  // Dependencies and conditions
  dependencies?: string[];           // Task dependencies
  condition?: string | Function;     // Condition for execution
  
  // Execution settings
  timeout?: number;                  // Timeout in milliseconds
  retries?: number;                  // Number of retries
  retryDelay?: number;               // Delay between retries
  continueOnError?: boolean;         // Continue execution on error
  
  // Environment
  cwd?: string;                      // Working directory
  env?: Record<string, string>;      // Environment variables
  
  // Outputs
  outputs?: Record<string, string>;  // Output variable definitions
}
```

## API Reference

### TaskRunner Class

```typescript
class TaskRunner {
  constructor(options?: TaskRunnerOptions);
  
  // Task management
  addTask(task: Task): void;
  removeTask(name: string): boolean;
  getTask(name: string): Task | null;
  getAllTasks(): Task[];
  
  // Task execution
  runTask(name: string, options?: RunOptions): Promise<TaskResult>;
  runTasks(tasks: string[] | Task[], options?: RunOptions): Promise<TaskResults>;
  runAllTasks(options?: RunOptions): Promise<TaskResults>;
  
  // Task status
  getTaskStatus(name: string): TaskStatus;
  getAllTaskStatus(): Record<string, TaskStatus>;
  
  // Event handling
  on(event: TaskRunnerEvent, listener: Function): void;
  off(event: TaskRunnerEvent, listener: Function): void;
  
  // Control
  stop(): Promise<void>;
  pause(): Promise<void>;
  resume(): Promise<void>;
}
```

### TaskResult Interface

```typescript
interface TaskResult {
  name: string;
  status: 'success' | 'failure' | 'skipped' | 'cancelled';
  startTime: number;
  endTime: number;
  duration: number;
  output: string;
  error?: Error;
  exitCode?: number;
  outputs?: Record<string, string>;
}
```

### TaskStatus Enum

```typescript
enum TaskStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILURE = 'failure',
  SKIPPED = 'skipped',
  CANCELLED = 'cancelled'
}
```

## Integration with Other Components

The Task Runner works closely with other Solo Build components:

- **Workflow Engine**: Executes tasks defined in workflows
- **CLI**: Provides commands for running tasks
- **Reporter**: Generates reports on task execution
- **Config Manager**: Loads and validates task configuration

## Examples

### Building a TypeScript Project

```typescript
import { TaskRunner } from '@solo-build/task-runner';

const runner = new TaskRunner();

// Define build tasks
const tasks = [
  {
    name: 'clean',
    command: 'rimraf dist'
  },
  {
    name: 'compile',
    command: 'tsc',
    dependencies: ['clean']
  },
  {
    name: 'bundle',
    command: 'webpack',
    dependencies: ['compile']
  },
  {
    name: 'minify',
    command: 'terser dist/bundle.js -o dist/bundle.min.js',
    dependencies: ['bundle']
  }
];

// Add tasks to runner
tasks.forEach(task => runner.addTask(task));

// Run all tasks
async function build() {
  try {
    const results = await runner.runAllTasks();
    console.log('Build completed successfully');
    console.log(results);
  } catch (error) {
    console.error('Build failed:', error);
  }
}

build();
```

### Running Tests with Parallel Execution

```typescript
import { TaskRunner } from '@solo-build/task-runner';

const runner = new TaskRunner({
  concurrency: 3  // Run up to 3 tasks in parallel
});

// Define test tasks
runner.addTask({
  name: 'unit-tests',
  command: 'jest --testMatch="**/*.unit.test.ts"'
});

runner.addTask({
  name: 'integration-tests',
  command: 'jest --testMatch="**/*.integration.test.ts"'
});

runner.addTask({
  name: 'e2e-tests',
  command: 'cypress run'
});

// Run all tests in parallel
async function runTests() {
  try {
    const results = await runner.runAllTasks();
    
    const failedTests = Object.values(results).filter(
      result => result.status === 'failure'
    );
    
    if (failedTests.length > 0) {
      console.error(`${failedTests.length} test suites failed`);
      process.exit(1);
    } else {
      console.log('All tests passed');
    }
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  }
}

runTests();
```

### Custom Task Function

```typescript
import { TaskRunner } from '@solo-build/task-runner';
import { analyzeCode } from './code-analyzer';

const runner = new TaskRunner();

// Add a function task
runner.addTask({
  name: 'analyze-code',
  function: async (context) => {
    const { sourceDir } = context.options;
    
    console.log(`Analyzing code in ${sourceDir}...`);
    const results = await analyzeCode(sourceDir);
    
    // Set task outputs
    context.setOutput('complexity', results.complexity.toString());
    context.setOutput('issues', results.issues.length.toString());
    
    return results;
  },
  outputs: {
    complexity: 'Code complexity score',
    issues: 'Number of issues found'
  }
});

// Run the task
async function analyze() {
  const result = await runner.runTask('analyze-code', {
    options: {
      sourceDir: './src'
    }
  });
  
  console.log('Analysis completed');
  console.log(`Complexity: ${result.outputs.complexity}`);
  console.log(`Issues: ${result.outputs.issues}`);
}

analyze();
```

## Best Practices

1. **Use Meaningful Task Names**: Choose descriptive names that clearly indicate what each task does
2. **Define Dependencies Correctly**: Ensure task dependencies are correctly defined to avoid race conditions
3. **Set Appropriate Timeouts**: Configure timeouts based on expected task duration
4. **Handle Task Failures**: Decide whether tasks should continue or stop on failure
5. **Use Concurrency Wisely**: Set concurrency based on available system resources
6. **Monitor Long-Running Tasks**: Implement progress reporting for tasks that take a long time
7. **Capture Task Outputs**: Use task outputs to share data between tasks
8. **Implement Error Handling**: Add proper error handling for robust task execution
