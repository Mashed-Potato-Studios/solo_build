# Analyze Command

The `analyze` command runs Solo Build's analysis phase on your project without executing the full build process, providing insights into your code's structure, complexity, and potential issues. It also generates comprehensive reports in various formats.

## Usage

```bash
solo-build analyze [options] [files...]
```

## Options

| Option             | Type      | Default                | Description                                                                                    |
| ------------------ | --------- | ---------------------- | ---------------------------------------------------------------------------------------------- |
| `--config`, `-c`   | `string`  | `solo-build.config.js` | Path to the configuration file                                                                 |
| `--format`         | `string`  | `all`                  | Report formats to generate (comma-separated: html,json,markdown,all)                           |
| `--report-type`    | `string`  | `all`                  | Types of reports to generate (comma-separated: complexity,issues,dependencies,performance,all) |
| `--output-dir`     | `string`  | `reports`              | Directory to output reports                                                                    |
| `--visualizations` | `boolean` | `true`                 | Whether to include visualizations in reports                                                   |
| `--verbose`, `-v`  | `boolean` | `false`                | Enable verbose logging                                                                         |
| `--no-ai`          | `boolean` | `false`                | Disable AI analysis features                                                                   |

## Description

The `analyze` command performs a comprehensive analysis of your codebase and generates detailed reports, focusing on:

1. **Code Complexity**: Calculates cyclomatic complexity, cognitive complexity, and maintainability index
2. **Dependencies**: Maps internal and external dependencies, identifying potential issues
3. **Code Issues**: Detects code smells, potential bugs, and architectural problems
4. **Architecture**: Analyzes the overall structure of your application
5. **Performance**: Analyzes build performance and optimization opportunities
6. **AI Insights**: Provides AI-powered suggestions for code improvements (if enabled)

## Reports Generated

The analyze command generates several types of reports:

| Report Type  | Description                                               |
| ------------ | --------------------------------------------------------- |
| Complexity   | Detailed metrics about your code's complexity             |
| Issues       | Identified problems in your codebase with severity levels |
| Dependencies | Relationships between modules and components              |
| Performance  | Build time and optimization analysis                      |
| Summary      | Comprehensive overview with score and recommendations     |

Each report can be generated in multiple formats:

| Format   | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| HTML     | Interactive reports with visualizations and filtering capabilities |
| JSON     | Machine-readable structured data for programmatic processing       |
| Markdown | Human-readable text-based reports for documentation                |

## Examples

### Basic Usage

```bash
# Analyze the entire project with default settings
solo-build analyze
```

### Specifying Report Formats

```bash
# Generate only HTML and JSON reports
solo-build analyze --format html,json
```

### Specifying Report Types

```bash
# Generate only complexity and dependencies reports
solo-build analyze --report-type complexity,dependencies
```

### Custom Output Directory

```bash
# Specify a custom output directory
solo-build analyze --output-dir ./analysis-reports
```

### Controlling Visualizations

```bash
# Disable visualizations in reports
solo-build analyze --visualizations false
```

### Complete Example

```bash
# Complete example with multiple options
solo-build analyze \
  --config solo-build.config.js \
  --format html,json \
  --report-type complexity,issues,dependencies \
  --output-dir ./reports \
  --visualizations true \
  --verbose
```

## Configuration

You can also configure analysis and reporting options in your `solo-build.config.js` file:

```javascript
module.exports = {
  // ... other configuration options

  // Analysis configuration
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: true,
    security: true,
  },

  // Reporting configuration
  reports: {
    enabled: true,
    formats: ["html", "json", "markdown"],
    types: ["complexity", "issues", "dependencies", "performance"],
    outputDir: "reports",
    includeVisualizations: true,
  },
};
```

## Viewing Reports

After generating reports, you can view them using the `report` command:

```bash
# List all generated reports
solo-build report list

# Open a report in your browser
solo-build report open --report build-summary.html
```

## Report Outputs

The analysis reports include:

- **Summary Report**: Overview of key metrics with architecture score
- **Complexity Reports**: Detailed complexity metrics for each file
- **Dependency Visualizations**: Interactive graphs of module relationships
- **Issue Lists**: Detailed information on detected issues
- **Performance Metrics**: Build time analysis and optimization opportunities
- **Recommendations**: Suggested improvements with AI-powered insights

## Related Commands

- [`report`](/docs/cli-report): Manage and view generated reports
- [`run`](/docs/cli-run): Run the full Solo Build process
- [`init`](/docs/cli-init): Initialize a new Solo Build project
