# Using the Reporter via CLI

The Solo Build CLI provides easy access to generate comprehensive reports about your codebase. Here are the main commands to use the reporting functionality:

## Basic Usage

Generate all reports with default settings:

```bash
npx solo-build analyze --config solo-build.config.js
```

This will:

1. Analyze your codebase according to your configuration
2. Generate all reports (complexity, issues, dependencies, etc.)
3. Save them to the `reports` directory in your project

## Specifying Report Formats

Generate reports in specific formats:

```bash
npx solo-build analyze --format html,json --config solo-build.config.js
```

Options for `--format`:

- `html`: Generate interactive HTML reports (default)
- `json`: Generate machine-readable JSON reports
- `markdown`: Generate markdown reports
- `all`: Generate all formats (default)

## Specific Report Types

Generate only specific types of reports:

```bash
npx solo-build analyze --report-type complexity,dependencies --config solo-build.config.js
```

Options for `--report-type`:

- `complexity`: Code complexity metrics
- `issues`: Code issues and recommendations
- `dependencies`: Dependency relationships
- `performance`: Build performance metrics
- `all`: Generate all report types (default)

## Custom Output Directory

Specify a custom directory for reports:

```bash
npx solo-build analyze --output-dir ./my-reports --config solo-build.config.js
```

## Including Visualizations

Control whether to include visualizations:

```bash
npx solo-build analyze --visualizations true --config solo-build.config.js
```

## Full Example with Multiple Options

```bash
npx solo-build analyze \
  --config solo-build.config.js \
  --format html,json \
  --report-type complexity,issues,dependencies \
  --output-dir ./reports \
  --visualizations true
```

## Combined with Build

You can also generate reports as part of the build process:

```bash
npx solo-build run --reports true --config solo-build.config.js
```

## Report Configuration in solo-build.config.js

You can also configure reporting options in your config file:

```js
// solo-build.config.js
module.exports = {
  sourceDir: "src",
  outDir: "dist",
  // ... other build options

  // Analysis configuration
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: true,
    security: true,
  },

  // Reporting configuration
  reports: {
    formats: ["html", "json", "markdown"],
    outputDir: "reports",
    includeVisualizations: true,
    types: ["complexity", "issues", "dependencies", "performance"],
  },
};
```

## Opening Reports

After generating reports, you can open the HTML reports in your browser:

```bash
npx solo-build report open
```

This will open the summary report in your default browser.

## Viewing Report List

To see a list of all generated reports:

```bash
npx solo-build report list
```

This will show you all reports that have been generated for your project.
