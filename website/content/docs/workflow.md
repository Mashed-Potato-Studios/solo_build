---
title: Workflow Engine
description: Learn about the Workflow Engine component that provides event-driven workflows, job and step systems, and environment management
---

# Workflow Engine

The Workflow Engine is a powerful component of the Solo Build system that allows you to define, manage, and execute complex build workflows similar to GitHub Actions.

## Overview

The Workflow Engine provides a flexible way to automate your build processes, testing, and deployment pipelines. It uses a declarative YAML-based syntax to define workflows that can be triggered by various events or run manually.

## Features

### Event-Driven Workflows

The Workflow Engine supports various event triggers:

- **File Changes**: Trigger workflows when specific files change
- **Build Events**: Run workflows at different stages of the build process
- **Manual Execution**: Run workflows on demand via CLI commands
- **Scheduled Execution**: Run workflows at specified intervals
- **Dependency Updates**: Trigger workflows when dependencies are updated

### Job and Step System

Workflows are organized into jobs and steps:

- **Jobs**: Independent units of work that can run in parallel or sequentially
- **Steps**: Individual tasks within a job that execute commands or actions
- **Dependencies**: Define dependencies between jobs to control execution order
- **Conditions**: Run jobs and steps conditionally based on expressions
- **Matrix Builds**: Run jobs with different configurations in parallel

### Actions and Reusable Components

The Workflow Engine supports reusable components:

- **Built-in Actions**: Common tasks like file operations, testing, and deployment
- **Custom Actions**: Create your own reusable actions for project-specific tasks
- **Workflow Templates**: Predefined workflows for common scenarios
- **Shared Steps**: Reuse step definitions across multiple workflows

### Environment and Secrets Management

Securely manage environment variables and secrets:

- **Environment Variables**: Define variables at workflow, job, or step level
- **Secrets Management**: Securely store and use sensitive information
- **Context Variables**: Access information about the current workflow execution
- **Output Variables**: Share data between jobs and steps

## Usage

### Basic Workflow Definition

Create a workflow file in the `.solo-build/workflows` directory:

```yaml
# .solo-build/workflows/build.yml
name: Build and Test
on:
  workflow_dispatch:  # Manual trigger
  build.start:        # Build event trigger
    branches:
      - main
      - dev

jobs:
  lint:
    name: Lint
    runs-on: node
    steps:
      - name: Run ESLint
        run: eslint src/**/*.ts
  
  build:
    name: Build
    needs: lint
    runs-on: node
    steps:
      - name: Clean
        run: rimraf dist
      
      - name: Build
        run: tsc
  
  test:
    name: Test
    needs: build
    runs-on: node
    steps:
      - name: Run Tests
        run: jest
      
      - name: Generate Coverage
        run: jest --coverage
```

### Running Workflows

You can run workflows using the CLI:

```bash
# Run a workflow manually
npx solo-build workflow run build

# List all available workflows
npx solo-build workflow list

# Show workflow status
npx solo-build workflow status build
```

### Configuration

You can configure the Workflow Engine in your `solo-build.config.js` file:

```javascript
module.exports = {
  // ... other configuration options
  workflow: {
    directory: '.solo-build/workflows',
    defaultRunner: 'node',
    runners: {
      node: {
        image: 'node:16',
        setup: ['npm install']
      }
    },
    timeout: 3600,  // 1 hour
    concurrency: 2  // Run up to 2 jobs in parallel
  }
};
```

## Workflow Syntax

### Events

```yaml
on:
  # Manual trigger
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
  
  # File change trigger
  push:
    paths:
      - 'src/**/*.ts'
      - 'package.json'
    branches:
      - main
      - 'feature/**'
  
  # Build event trigger
  build.start:
  build.complete:
  
  # Scheduled trigger
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
```

### Jobs

```yaml
jobs:
  build:
    name: Build
    runs-on: node
    timeout: 10m
    environment: production
    if: ${{ success() && github.ref == 'refs/heads/main' }}
    
    # Matrix builds
    strategy:
      matrix:
        node: [14, 16, 18]
        os: [ubuntu, windows]
        exclude:
          - node: 14
            os: windows
    
    # Environment variables
    env:
      NODE_ENV: production
    
    # Job dependencies
    needs: [lint, test]
    
    # Steps
    steps:
      - name: Build
        run: npm run build
```

### Steps

```yaml
steps:
  # Run a command
  - name: Install Dependencies
    run: npm install
  
  # Use a built-in action
  - name: Upload Artifacts
    uses: actions/upload-artifact
    with:
      name: build
      path: dist
  
  # Conditional step
  - name: Deploy
    if: ${{ success() && matrix.node == 16 }}
    run: npm run deploy
    env:
      API_KEY: ${{ secrets.API_KEY }}
  
  # Step with outputs
  - name: Generate Version
    id: version
    run: echo "::set-output name=value::1.0.0"
  
  # Reference outputs from other steps
  - name: Use Version
    run: echo "Version is ${{ steps.version.outputs.value }}"
```

## API Reference

### Workflow Context

The workflow context provides information about the current workflow execution:

```yaml
# Access workflow context
${{ workflow.name }}        # Name of the workflow
${{ workflow.event }}       # Event that triggered the workflow
${{ workflow.ref }}         # Git reference (branch or tag)
${{ workflow.sha }}         # Git commit SHA
${{ workflow.repository }}  # Repository name
${{ workflow.workspace }}   # Path to the workspace directory
```

### Job Context

The job context provides information about the current job:

```yaml
# Access job context
${{ job.name }}      # Name of the job
${{ job.status }}    # Current status of the job
${{ job.container }} # Container information
${{ job.services }}  # Services information
```

### Steps Context

The steps context provides information about the steps in the current job:

```yaml
# Access steps context
${{ steps.step_id.outputs.output_name }}  # Output from a step
${{ steps.step_id.status }}               # Status of a step
```

## Integration with Other Components

The Workflow Engine works closely with other Solo Build components:

- **CLI**: Provides commands for managing workflows
- **Task Runner**: Executes the actual tasks defined in workflows
- **Reporter**: Generates reports on workflow execution
- **Config Manager**: Loads and validates workflow configuration

## Examples

### React Application Build Workflow

```yaml
# .solo-build/workflows/react-build.yml
name: React Build
on:
  push:
    paths:
      - 'src/**/*.tsx'
      - 'src/**/*.ts'
      - 'package.json'

jobs:
  lint:
    name: Lint
    runs-on: node
    steps:
      - name: Run ESLint
        run: npm run lint
  
  test:
    name: Test
    runs-on: node
    steps:
      - name: Run Tests
        run: npm test
  
  build:
    name: Build
    needs: [lint, test]
    runs-on: node
    steps:
      - name: Build
        run: npm run build
      
      - name: Upload Build
        uses: actions/upload-artifact
        with:
          name: build
          path: build
```

### Deployment Workflow

```yaml
# .solo-build/workflows/deploy.yml
name: Deploy
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

jobs:
  deploy:
    name: Deploy to ${{ inputs.environment }}
    runs-on: node
    environment: ${{ inputs.environment }}
    steps:
      - name: Build
        run: npm run build
      
      - name: Deploy
        run: npm run deploy:${{ inputs.environment }}
        env:
          API_KEY: ${{ secrets.API_KEY }}
```

## Best Practices

1. **Keep Workflows Simple**: Break complex workflows into smaller, focused workflows
2. **Use Job Dependencies**: Clearly define dependencies between jobs
3. **Leverage Reusable Actions**: Create and use reusable actions for common tasks
4. **Set Appropriate Timeouts**: Configure timeouts to prevent hung workflows
5. **Use Conditional Execution**: Only run jobs and steps when needed
6. **Secure Sensitive Data**: Use secrets for sensitive information
7. **Monitor Workflow Performance**: Regularly review workflow execution times and optimize as needed
