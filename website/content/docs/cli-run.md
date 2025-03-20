# Run Command

The `run` command is the primary way to execute Solo Build's analysis and build process on your project.

## Usage

```bash
solo-build run [options]
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--config`, `-c` | `string` | `solo-build.config.js` | Path to the configuration file |
| `--watch`, `-w` | `boolean` | `false` | Watch for file changes and rerun |
| `--verbose`, `-v` | `boolean` | `false` | Enable verbose logging |
| `--output`, `-o` | `string` | `./solo-build-output` | Output directory for reports and artifacts |
| `--no-ai` | `boolean` | `false` | Disable AI analysis features |

## Description

The `run` command executes the entire Solo Build pipeline, including:

1. **Parsing**: Analyzes your source code to create an Abstract Syntax Tree (AST)
2. **Analysis**: Examines the AST for complexity, dependencies, and potential issues
3. **Transformation**: Applies optimizations and transformations to your code
4. **Generation**: Outputs optimized code and detailed reports

## Examples

### Basic Usage

```bash
# Run Solo Build with default configuration
solo-build run
```

### Using a Custom Configuration File

```bash
# Specify a custom configuration file
solo-build run --config custom-config.js
```

### Watch Mode

```bash
# Run in watch mode to automatically reprocess on file changes
solo-build run --watch
```

### Verbose Output

```bash
# Enable detailed logging
solo-build run --verbose
```

### Custom Output Directory

```bash
# Specify a custom output directory
solo-build run --output ./custom-output
```

### Disable AI Features

```bash
# Run without AI-powered analysis
solo-build run --no-ai
```

## Integration with Workflows

The `run` command can execute workflows defined in your configuration file. By default, it runs the `default` workflow, but you can specify a different workflow:

```bash
# Run a specific workflow
solo-build run --workflow build
```

## Exit Codes

| Code | Description |
|------|-------------|
| `0` | Success |
| `1` | General error |
| `2` | Configuration error |
| `3` | Parsing error |
| `4` | Analysis error |
| `5` | Transformation error |
| `6` | Generation error |

## Related Commands

- [`init`](/docs/cli-init): Initialize a new Solo Build project
- [`analyze`](/docs/cli-analyze): Run only the analysis phase
- [`workflow`](/docs/cli-workflow): Manage Solo Build workflows
