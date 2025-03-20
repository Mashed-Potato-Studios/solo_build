# Task Runner Component

The Task Runner component is responsible for executing tasks defined in the build configuration. These tasks can be run before, during, or after the build process.

## Overview

The Task Runner provides a flexible way to define and execute tasks as part of the build process. Tasks can be simple shell commands, JavaScript functions, or complex workflows with dependencies and conditions.

## API

### Constructor

```typescript
constructor(config: BuildConfig)
```

Creates a new TaskRunner instance with the specified configuration.

#### Parameters

- `config`: The build configuration object

### Methods

#### runTasks

```typescript
async runTasks(taskNames: string | string[]): Promise<TaskResult[]>
```

Runs one or more tasks by name.

##### Parameters

- `taskNames`: A single task name or an array of task names to run

##### Returns

A promise that resolves to an array of TaskResult objects

#### runTask

```typescript
async runTask(taskName: string): Promise<TaskResult>
```

Runs a single task by name.

##### Parameters

- `taskName`: The name of the task to run

##### Returns

A promise that resolves to a TaskResult object

#### executeCommand

```typescript
async executeCommand(command: string): Promise<TaskResult>
```

Executes a shell command.

##### Parameters

- `command`: The shell command to execute

##### Returns

A promise that resolves to a TaskResult object

## Configuration

Tasks are defined in the `tasks` section of the build configuration:

```typescript
interface BuildConfig {
  // ... other config options
  tasks: Record<string, Task>;
}

interface Task {
  type: 'command' | 'function' | 'workflow';
  command?: string;
  function?: string | Function;
  workflow?: string;
  dependencies?: string[];
  condition?: string;
  continueOnError?: boolean;
}
```

### Example Task Configuration

```javascript
// solo-build.config.js
module.exports = {
  // ... other config options
  tasks: {
    'pre-build': {
      type: 'command',
      command: 'rimraf dist'
    },
    'lint': {
      type: 'command',
      command: 'eslint src/**/*.ts',
      continueOnError: true
    },
    'build': {
      type: 'command',
      command: 'tsc',
      dependencies: ['pre-build', 'lint']
    },
    'test': {
      type: 'command',
      command: 'jest',
      dependencies: ['build']
    },
    'post-build': {
      type: 'command',
      command: 'cp package.json dist/',
      dependencies: ['build'],
      condition: 'process.env.NODE_ENV === "production"'
    }
  }
}
```

## Task Types

The Task Runner supports several types of tasks:

### Command Tasks

Command tasks execute shell commands:

```javascript
{
  type: 'command',
  command: 'npm run build'
}
```

### Function Tasks

Function tasks execute JavaScript functions:

```javascript
{
  type: 'function',
  function: 'src/tasks/build.js'
}
```

or

```javascript
{
  type: 'function',
  function: async (context) => {
    // Task implementation
  }
}
```

### Workflow Tasks

Workflow tasks trigger workflows defined in the Workflow Engine:

```javascript
{
  type: 'workflow',
  workflow: 'build'
}
```

## Task Dependencies

Tasks can depend on other tasks, which will be executed before the task itself:

```javascript
{
  type: 'command',
  command: 'tsc',
  dependencies: ['clean', 'lint']
}
```

## Conditional Execution

Tasks can be conditionally executed using the `condition` property:

```javascript
{
  type: 'command',
  command: 'npm run deploy',
  condition: 'process.env.NODE_ENV === "production"'
}
```

## Error Handling

By default, if a task fails, the Task Runner will stop executing tasks and return an error. You can change this behavior using the `continueOnError` property:

```javascript
{
  type: 'command',
  command: 'eslint src/**/*.ts',
  continueOnError: true
}
```

## Task Context

Tasks have access to a context object that contains information about the build process:

```javascript
{
  type: 'function',
  function: async (context) => {
    console.log(`Project root: ${context.config.projectRoot}`);
    console.log(`Source directory: ${context.config.sourceDir}`);
    console.log(`Output directory: ${context.config.outDir}`);
  }
}
```

## Performance Considerations

- Tasks are executed sequentially by default
- Tasks with dependencies are executed in the correct order
- Function tasks can be more efficient than command tasks for complex operations

## Future Improvements

- Add support for parallel task execution
- Improve task dependency resolution
- Add support for task timeouts
- Add support for task retries
