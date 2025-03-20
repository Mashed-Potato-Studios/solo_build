# Workflow Command

The `workflow` command allows you to manage and execute Solo Build workflows, which are sequences of tasks that automate your build and analysis processes.

## Usage

```bash
solo-build workflow <subcommand> [options]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `list` | List all available workflows |
| `run` | Run a specific workflow |
| `create` | Create a new workflow |
| `edit` | Edit an existing workflow |
| `delete` | Delete a workflow |
| `export` | Export a workflow to a file |
| `import` | Import a workflow from a file |

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--config`, `-c` | `string` | `solo-build.config.js` | Path to the configuration file |
| `--verbose`, `-v` | `boolean` | `false` | Enable verbose logging |
| `--name`, `-n` | `string` | - | Workflow name (required for run, edit, delete) |
| `--file`, `-f` | `string` | - | File path (required for export, import) |

## Description

The `workflow` command provides a powerful way to automate sequences of tasks in your build process. Workflows are defined in your Solo Build configuration file and can include any command or script you would normally run manually.

Workflows in Solo Build are inspired by GitHub Actions, providing a familiar syntax for defining tasks, dependencies, and conditions.

## Workflow Structure

A workflow consists of:

- **Name**: Unique identifier for the workflow
- **Description**: Optional description of what the workflow does
- **Steps**: Sequence of tasks to execute
- **Conditions**: Optional conditions for when the workflow should run
- **Dependencies**: Optional dependencies on other workflows

Each step in a workflow includes:

- **Name**: Description of the step
- **Run**: Command to execute
- **If**: Optional condition for when the step should run
- **Env**: Optional environment variables for the step
- **WorkingDirectory**: Optional working directory for the step

## Examples

### Listing Workflows

```bash
# List all available workflows
solo-build workflow list
```

### Running a Workflow

```bash
# Run a specific workflow
solo-build workflow run --name build
```

### Creating a Workflow

```bash
# Create a new workflow interactively
solo-build workflow create
```

### Editing a Workflow

```bash
# Edit an existing workflow
solo-build workflow edit --name build
```

### Deleting a Workflow

```bash
# Delete a workflow
solo-build workflow delete --name build
```

### Exporting a Workflow

```bash
# Export a workflow to a file
solo-build workflow export --name build --file build-workflow.json
```

### Importing a Workflow

```bash
# Import a workflow from a file
solo-build workflow import --file build-workflow.json
```

## Workflow Configuration Example

Here's an example of how workflows are defined in your `solo-build.config.js` file:

```javascript
module.exports = {
  // ... other configuration
  workflows: {
    build: {
      description: 'Build the project',
      steps: [
        {
          name: 'Clean output directory',
          run: 'rimraf dist'
        },
        {
          name: 'Run tests',
          run: 'jest',
          if: 'process.env.NODE_ENV !== "production"'
        },
        {
          name: 'Build project',
          run: 'tsc',
          env: {
            NODE_ENV: 'production'
          }
        },
        {
          name: 'Generate documentation',
          run: 'typedoc',
          workingDirectory: './src'
        }
      ]
    },
    deploy: {
      description: 'Deploy the project',
      dependencies: ['build'],
      steps: [
        {
          name: 'Deploy to production',
          run: 'npm publish',
          if: 'process.env.CI === "true"'
        }
      ]
    }
  }
};
```

## Integration with Task Runner

The workflow command integrates with Solo Build's Task Runner to execute tasks efficiently, handling dependencies, parallel execution, and error management.

## Related Commands

- [`run`](/docs/cli-run): Run the full Solo Build process
- [`init`](/docs/cli-init): Initialize a new Solo Build project
- [`analyze`](/docs/cli-analyze): Run only the analysis phase
