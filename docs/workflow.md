# Workflow Engine

The Workflow Engine provides a GitHub Actions-like workflow system for automating build tasks and other processes.

## Overview

The Workflow Engine allows you to define workflows that are triggered by events in the build process. Each workflow consists of one or more jobs, and each job consists of one or more steps. Steps can run commands, use actions, or trigger other workflows.

## API

### Constructor

```typescript
constructor(config: BuildConfig)
```

Creates a new WorkflowEngine instance with the specified configuration.

#### Parameters

- `config`: The build configuration object

### Methods

#### loadWorkflows

```typescript
async loadWorkflows(): Promise<void>
```

Loads all workflows from the configuration and workflow files.

#### triggerEvent

```typescript
async triggerEvent(event: WorkflowEvent): Promise<void>
```

Triggers an event that may start one or more workflows.

##### Parameters

- `event`: The event to trigger, containing a name and optional payload

#### runWorkflow

```typescript
async runWorkflow(workflow: Workflow, event: WorkflowEvent): Promise<void>
```

Runs a workflow with the specified event.

##### Parameters

- `workflow`: The workflow to run
- `event`: The event that triggered the workflow

#### runJob

```typescript
async runJob(job: Job, context: WorkflowContext): Promise<void>
```

Runs a job with the specified context.

##### Parameters

- `job`: The job to run
- `context`: The workflow context

## Configuration

Workflows can be defined in the build configuration file or in separate workflow files in the `.solo-build/workflows` directory.

### Workflow Configuration

```typescript
interface Workflow {
  name: string;
  on: Record<string, any>;
  jobs: Record<string, Job>;
}

interface Job {
  name: string;
  steps: Step[];
}

interface Step {
  name: string;
  run?: string;
  uses?: string;
  with?: Record<string, any>;
}
```

### Example Workflow

```yaml
# .solo-build/workflows/build.yml
name: Build
on:
  workflow_dispatch:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:
    name: Build
    steps:
      - name: Clean
        run: rimraf dist
      
      - name: Build
        run: solo-build run
      
      - name: Test
        run: jest
```

## Events

The Workflow Engine supports the following built-in events:

- `workflow_dispatch`: Manually triggered workflow
- `build.start`: Triggered when the build process starts
- `build.complete`: Triggered when the build process completes
- `build.error`: Triggered when the build process encounters an error
- `analyze.complete`: Triggered when the analysis process completes

You can also define custom events in your workflows.

## Actions

Actions are reusable units of code that can be used in workflows. Solo Build provides several built-in actions:

- `solo-build/actions/setup`: Sets up the build environment
- `solo-build/actions/build`: Runs the build process
- `solo-build/actions/test`: Runs tests
- `solo-build/actions/analyze`: Analyzes code
- `solo-build/actions/deploy`: Deploys the build output

You can also use custom actions by specifying a path to a JavaScript file.

### Example Action Usage

```yaml
steps:
  - name: Setup
    uses: solo-build/actions/setup
    with:
      node-version: 16
  
  - name: Build
    uses: solo-build/actions/build
    with:
      config: solo-build.config.js
```

## Context

The Workflow Engine provides a context object that contains information about the current workflow, job, and step. The context is available to steps as environment variables and can be accessed in commands using the `${{ context }}` syntax.

### Context Properties

- `event`: The event that triggered the workflow
- `workflow`: The current workflow
- `job`: The current job
- `step`: The current step
- `env`: Environment variables
- `secrets`: Secrets defined in the configuration

### Example Context Usage

```yaml
steps:
  - name: Print Event
    run: echo "Event name: ${{ context.event.name }}"
  
  - name: Print Branch
    run: echo "Branch: ${{ context.event.payload.ref }}"
```

## Conditional Execution

Steps and jobs can be conditionally executed using the `if` property. The condition is evaluated as a JavaScript expression with access to the context.

### Example Conditional Execution

```yaml
steps:
  - name: Build
    run: solo-build run
  
  - name: Deploy
    if: context.event.name == 'push' && context.event.payload.ref == 'refs/heads/main'
    run: solo-build deploy
```

## Error Handling

The Workflow Engine handles errors during workflow execution and provides detailed error messages. If a step fails, the workflow continues to the next step unless the `continue-on-error` property is set to `false`.

### Example Error Handling

```yaml
steps:
  - name: Build
    run: solo-build run
    continue-on-error: false
  
  - name: Deploy
    run: solo-build deploy
    continue-on-error: true
```

## Performance Considerations

- Workflows can be CPU and memory-intensive, especially with many steps
- Steps are executed sequentially within a job
- Jobs can be executed in parallel if the `needs` property is not specified

## Future Improvements

- Add support for more complex workflow patterns
- Improve error handling and reporting
- Add support for more actions
- Add support for workflow templates
