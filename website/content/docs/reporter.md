---
title: Reporter Component
description: Learn about the Reporter component that formats and presents analysis results, build outputs, and workflow status information
---

# Reporter Component

The Reporter is a versatile component of the Solo Build system that formats and presents analysis results, build outputs, and workflow status information. It provides rich, customizable reporting capabilities to help you understand your codebase and build process.

## Features

- **Comprehensive Reports**: Detailed reports on build process, code quality, and performance
- **Multiple Output Formats**: Supports JSON, HTML, and Markdown formats for all report types
- **Interactive Visualizations**: Creates charts and graphs to visualize complexity metrics and dependencies
- **Issue Summaries**: Provides detailed issue summaries with recommendations for improvement
- **Performance Metrics**: Tracks and reports on build performance and optimization opportunities
- **Customizable Templates**: Allows customization of report templates and styling
- **CLI Integration**: Fully integrated with the Solo Build CLI

## CLI Usage

The Reporter can be used directly through the CLI with the `analyze` and `report` commands:

```bash
# Generate all reports with default settings
npx solo-build analyze --config solo-build.config.js

# Specify report formats
npx solo-build analyze --format html,json --config solo-build.config.js

# Generate only specific types of reports
npx solo-build analyze --report-type complexity,dependencies --config solo-build.config.js

# Customize the output directory
npx solo-build analyze --output-dir ./my-reports --config solo-build.config.js

# Control visualizations
npx solo-build analyze --visualizations true --config solo-build.config.js
```

After generating reports, you can manage them with the `report` command:

```bash
# List all generated reports
npx solo-build report list

# Open a report in your browser
npx solo-build report open --report build-summary.html
```

## Programmatic Usage

The Reporter can also be used programmatically:

```typescript
import { Reporter } from "@solo-build/reporter";
import { Analyzer } from "@solo-build/analyzer";

// Create a reporter instance
const reporter = new Reporter(config);

// Generate analysis data
const analyzer = new Analyzer(config);
const analysisResult = await analyzer.analyze(parseResult.ast);

// Generate reports
const reports = await reporter.generateReports(analysisResult, {
  duration: buildDuration,
  stats: {
    files: 25,
    totalSize: 125000,
    outputSize: 85000,
    compressionRatio: 0.68,
  },
});

console.log(`Generated ${reports.length} reports`);
```

## Configuration

### Solo Build Config File

You can configure the Reporter through your `solo-build.config.js` file:

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
    enabled: true, // Enable/disable reports
    formats: ["html", "json", "markdown"], // Report formats
    types: ["complexity", "issues", "dependencies", "performance"], // Report types
    outputDir: "reports", // Output directory
    includeVisualizations: true, // Include visualizations
  },
};
```

### Configuration Options

| Option                          | Type       | Description                                                          |
| ------------------------------- | ---------- | -------------------------------------------------------------------- |
| `reports.enabled`               | `boolean`  | Enable/disable report generation                                     |
| `reports.formats`               | `string[]` | Output formats (`html`, `json`, `markdown`)                          |
| `reports.types`                 | `string[]` | Report types (`complexity`, `issues`, `dependencies`, `performance`) |
| `reports.outputDir`             | `string`   | Directory for report files                                           |
| `reports.includeVisualizations` | `boolean`  | Include visualizations in HTML reports                               |

## Report Types

The Reporter generates several types of reports:

### Complexity Reports

Complexity reports provide detailed metrics about your code's complexity:

- Cyclomatic complexity per file
- Relative complexity rankings
- Complexity visualizations
- Hot spots requiring refactoring

### Issues Reports

Issues reports identify problems in your codebase:

- Code issues with severity levels
- Line numbers and locations
- Suggested fixes
- Issue categorization

### Dependencies Reports

Dependencies reports map relationships between modules:

- Module dependencies
- Dependency graphs
- Circular dependency detection
- External dependency analysis

### Performance Reports

Performance reports analyze build and runtime performance:

- Build time analysis
- File size metrics
- Compression ratios
- Optimization opportunities

### Summary Report

A comprehensive overview report that combines key insights from all report types:

- Overall codebase health score
- Key issues and insights
- Recommendations for improvement
- Performance metrics

## Report Formats

### HTML Format

HTML reports provide interactive, visually rich presentations:

- Interactive charts and graphs
- Filterable tables
- Collapsible sections
- Syntax highlighting
- Visual indicators for severity levels

### JSON Format

JSON reports provide structured data for programmatic processing:

- Machine-readable format
- Easily parseable by other tools
- Complete structured data
- Suitable for CI/CD integration

### Markdown Format

Markdown reports balance readability with simplicity:

- Readable in text editors and GitHub
- Tables and formatting for readability
- Header-based navigation
- Code blocks with syntax highlighting

## Customizing Reports

You can customize report templates by extending the Reporter class:

```typescript
class CustomReporter extends Reporter {
  constructor(config) {
    super(config);
    // Override the template directory
    this.templateDir = path.join(__dirname, "custom-templates");
  }

  // Override methods to customize report generation
  async generateComplexityReport(analysis, format) {
    // Custom implementation for complexity reports
    if (format !== "html") {
      return super.generateComplexityReport(analysis, format);
    }

    // Custom HTML template implementation
    // ...
  }
}
```

Custom templates use EJS for templating:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Custom Complexity Report</title>
    <style>
      /* Custom styles */
    </style>
  </head>
  <body>
    <h1>Code Complexity Report</h1>
    <div class="summary">
      <div class="metric">
        <h3>Total Files</h3>
        <div class="value"><%= Object.keys(complexity).length %></div>
      </div>
      <!-- More metrics -->
    </div>
    <!-- Report content -->
  </body>
</html>
```

## Visualizations

The Reporter includes several visualization types:

### Complexity Visualizations

- Bar charts showing relative complexity
- Color-coded complexity ratings
- File complexity rankings

### Dependency Visualizations

- Force-directed dependency graphs
- Interactive module relationship diagrams
- Circular dependency highlighting

### Performance Visualizations

- Build time breakdown charts
- Size comparison charts
- Optimization opportunity indicators

## Examples

Check the `examples` directory for detailed examples of using the Reporter:

- `reporter-usage.ts` - Basic usage
- `using-in-build-pipeline.ts` - Integration with build pipeline
- `customizing-reports.ts` - Custom templates and report formats
- `cli-usage.md` - Complete CLI usage guide

## CI/CD Integration

The Reporter is designed to work well with CI/CD systems:

```yaml
# .github/workflows/analyze.yml
name: Code Analysis

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "16"
      - run: npm install
      - name: Run analysis
        run: npx solo-build analyze --format json,html --output-dir ./reports
      - name: Upload reports
        uses: actions/upload-artifact@v3
        with:
          name: code-reports
          path: reports/
```
