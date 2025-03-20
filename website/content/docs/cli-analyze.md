# Analyze Command

The `analyze` command runs Solo Build's analysis phase on your project without executing the full build process, providing insights into your code's structure, complexity, and potential issues.

## Usage

```bash
solo-build analyze [options] [files...]
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `--config`, `-c` | `string` | `solo-build.config.js` | Path to the configuration file |
| `--output`, `-o` | `string` | `./solo-build-analysis` | Output directory for analysis reports |
| `--format`, `-f` | `string` | `html` | Output format (html, json, markdown) |
| `--verbose`, `-v` | `boolean` | `false` | Enable verbose logging |
| `--no-ai` | `boolean` | `false` | Disable AI analysis features |
| `--depth`, `-d` | `number` | `3` | Maximum depth for dependency analysis |

## Description

The `analyze` command performs a comprehensive analysis of your codebase, focusing on:

1. **Code Complexity**: Calculates cyclomatic complexity, cognitive complexity, and maintainability index
2. **Dependencies**: Maps internal and external dependencies, identifying potential issues
3. **Code Issues**: Detects code smells, potential bugs, and architectural problems
4. **Architecture**: Analyzes the overall structure of your application
5. **AI Insights**: Provides AI-powered suggestions for code improvements (if enabled)

This command is useful when you want to understand your codebase better without making any changes to it.

## Analysis Metrics

Solo Build's analyzer provides several key metrics:

| Metric | Description |
|--------|-------------|
| Complexity Score | Overall complexity rating of your codebase |
| Dependency Count | Number of internal and external dependencies |
| Issue Count | Number of detected code issues |
| Maintainability Index | Score indicating how maintainable your code is |
| Duplication Percentage | Percentage of duplicated code |

## Examples

### Basic Usage

```bash
# Analyze the entire project
solo-build analyze
```

### Analyzing Specific Files

```bash
# Analyze only specific files or directories
solo-build analyze src/components src/utils/helpers.js
```

### Custom Output Format

```bash
# Generate analysis in JSON format
solo-build analyze --format json
```

### Custom Output Location

```bash
# Specify a custom output directory
solo-build analyze --output ./analysis-reports
```

### Detailed Analysis

```bash
# Perform a deeper dependency analysis
solo-build analyze --depth 5
```

### Disable AI Features

```bash
# Run analysis without AI-powered insights
solo-build analyze --no-ai
```

## Output

The analysis report includes:

- **Summary**: Overview of key metrics
- **Complexity Analysis**: Detailed complexity metrics for each file
- **Dependency Graph**: Visual representation of dependencies
- **Issue List**: Detailed list of detected issues with severity levels
- **Recommendations**: Suggested improvements (including AI-powered suggestions if enabled)

## Integration with TypeScript

Solo Build's analyzer works seamlessly with TypeScript projects, providing additional type-based insights:

```bash
# Analyze a TypeScript project with type checking
solo-build analyze --typescript
```

## Related Commands

- [`run`](/docs/cli-run): Run the full Solo Build process
- [`init`](/docs/cli-init): Initialize a new Solo Build project
- [`workflow`](/docs/cli-workflow): Manage Solo Build workflows
