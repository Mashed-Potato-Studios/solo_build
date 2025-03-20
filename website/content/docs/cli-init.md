# Init Command

The `init` command helps you set up a new project with Solo Build by creating the necessary configuration files and project structure.

## Usage

```bash
solo-build init [options]
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--template`, `-t` | `string` | `default` | Template to use for initialization |
| `--framework`, `-f` | `string` | Auto-detected | Target framework (react, vue, node, etc.) |
| `--yes`, `-y` | `boolean` | `false` | Skip prompts and use defaults |
| `--verbose`, `-v` | `boolean` | `false` | Enable verbose logging |
| `--directory`, `-d` | `string` | Current directory | Target directory for initialization |

## Description

The `init` command sets up a new Solo Build project by:

1. **Creating configuration files**: Generates a `solo-build.config.js` file
2. **Setting up workflows**: Creates default workflows based on your project type
3. **Adding scripts**: Updates your package.json with Solo Build scripts
4. **Installing dependencies**: Optionally installs required dependencies

Solo Build will automatically detect your project's framework and language, but you can also specify them manually using the appropriate options.

## Templates

Solo Build provides several project templates:

| Template | Description |
|----------|-------------|
| `default` | Basic configuration for general JavaScript/TypeScript projects |
| `react` | Configuration optimized for React applications |
| `vue` | Configuration optimized for Vue.js applications |
| `node` | Configuration optimized for Node.js libraries |
| `ts-lib` | Configuration for TypeScript libraries with type declarations |
| `monorepo` | Configuration for monorepo projects |

## Examples

### Basic Initialization

```bash
# Initialize a new Solo Build project in the current directory
solo-build init
```

### Using a Specific Template

```bash
# Initialize using the React template
solo-build init --template react
```

### Specifying a Framework

```bash
# Initialize for a Vue.js project
solo-build init --framework vue
```

### Non-Interactive Mode

```bash
# Initialize with default settings without prompts
solo-build init --yes
```

### Custom Directory

```bash
# Initialize in a specific directory
solo-build init --directory ./my-project
```

## Configuration File

The generated `solo-build.config.js` file will look similar to this:

```javascript
module.exports = {
  sourceDir: 'src',
  outputDir: 'dist',
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
          name: 'Clean output directory',
          run: 'rimraf dist'
        },
        {
          name: 'Build project',
          run: 'tsc'
        }
      ]
    }
  }
}
```

## Related Commands

- [`run`](/docs/cli-run): Run the Solo Build process
- [`analyze`](/docs/cli-analyze): Run only the analysis phase
- [`workflow`](/docs/cli-workflow): Manage Solo Build workflows
