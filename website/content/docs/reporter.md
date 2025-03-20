---
title: Reporter Component
description: Learn about the Reporter component that formats and presents analysis results, build outputs, and workflow status information
---

# Reporter Component

The Reporter is a versatile component of the Solo Build system that formats and presents analysis results, build outputs, and workflow status information. It provides rich, customizable reporting capabilities to help you understand your codebase and build process.

## Features

- **Multiple Output Formats**: Supports various output formats including text, JSON, HTML, and Markdown
- **Interactive Reports**: Generates interactive HTML reports with filtering and sorting capabilities
- **Visual Data Representation**: Creates charts and graphs to visualize complexity metrics and dependencies
- **Customizable Templates**: Allows customization of report templates and styling
- **Integration with CI/CD**: Provides CI/CD-friendly reporting formats and integrations

## Usage

The Reporter can be used programmatically or through the CLI:

```typescript
import { Reporter } from '@solo-build/reporter';
import { Analyzer } from '@solo-build/analyzer';

// Create a reporter instance
const reporter = new Reporter({
  // Configuration options
  format: 'html',
  outputDir: 'reports',
  theme: 'default'
});

// Generate analysis data
const analyzer = new Analyzer();
const analysisResults = await analyzer.analyze('src/');

// Generate a report
const report = await reporter.generateReport('analysis', analysisResults, {
  title: 'Code Analysis Report',
  includeCharts: true
});

// Write the report to disk
await reporter.writeReport(report);

// Or get the report content as a string
const reportContent = reporter.renderReport(report);
console.log(reportContent);
```

## Configuration Options

| Option | Type | Description |
|--------|------|-------------|
| `format` | `'text' \| 'json' \| 'html' \| 'markdown'` | Output format (default: 'text') |
| `outputDir` | `string` | Directory for report files (default: 'reports') |
| `theme` | `'default' \| 'dark' \| 'light'` | Report theme (default: 'default') |
| `verbose` | `boolean` | Include detailed information (default: false) |
| `quiet` | `boolean` | Minimize output (default: false) |
| `includeCharts` | `boolean` | Include charts in HTML reports (default: true) |
| `templateDir` | `string` | Directory for custom templates |

## Report Types

The Reporter supports several types of reports:

### Analysis Reports

Analysis reports present the results of code analysis, including complexity metrics, dependencies, and issues:

```typescript
// Generate an analysis report
const report = await reporter.generateReport('analysis', analysisResults, {
  title: 'Code Analysis Report',
  includeCharts: true,
  sections: ['complexity', 'dependencies', 'issues']
});
```

### Build Reports

Build reports provide information about the build process, including build time, file sizes, and warnings:

```typescript
// Generate a build report
const report = await reporter.generateReport('build', buildResults, {
  title: 'Build Report',
  includeAssetSizes: true,
  includeModuleGraph: true
});
```

### Workflow Reports

Workflow reports show the status and results of workflow executions:

```typescript
// Generate a workflow report
const report = await reporter.generateReport('workflow', workflowResults, {
  title: 'Workflow Execution Report',
  includeTimeline: true,
  includeJobDetails: true
});
```

## API Reference

### Methods

#### `generateReport(type: ReportType, data: any, options?: ReportOptions): Promise<Report>`

Generates a report of the specified type with the given data and options.

#### `renderReport(report: Report): string`

Renders a report to a string.

#### `writeReport(report: Report, outputPath?: string): Promise<void>`

Writes a report to disk.

#### `registerTemplate(name: string, template: Template): void`

Registers a custom report template.

### Types

```typescript
type ReportType = 'analysis' | 'build' | 'workflow' | 'custom';

interface ReportOptions {
  title?: string;
  description?: string;
  format?: 'text' | 'json' | 'html' | 'markdown';
  theme?: 'default' | 'dark' | 'light';
  includeCharts?: boolean;
  sections?: string[];
  [key: string]: any;
}

interface Report {
  type: ReportType;
  title: string;
  description?: string;
  data: any;
  options: ReportOptions;
  content?: string;
  files?: ReportFile[];
}

interface ReportFile {
  path: string;
  content: string | Buffer;
  type: 'main' | 'asset' | 'data';
}

interface Template {
  render(data: any, options: ReportOptions): string | Promise<string>;
  assets?: Record<string, string | Buffer>;
}
```

## Output Formats

### Text Format

Text reports are designed for terminal output and provide a concise summary of the data:

```
Code Analysis Report
===================

Complexity Metrics:
- Average Cyclomatic Complexity: 5.2
- Average Cognitive Complexity: 7.8
- Most Complex File: src/complex-file.ts (Cyclomatic: 25)

Dependencies:
- Total Dependencies: 45
- Circular Dependencies: 2

Issues:
- Errors: 3
- Warnings: 12
- Info: 8
```

### JSON Format

JSON reports provide structured data that can be easily processed by other tools:

```json
{
  "title": "Code Analysis Report",
  "type": "analysis",
  "timestamp": "2023-06-15T14:30:00Z",
  "data": {
    "complexity": {
      "average": {
        "cyclomatic": 5.2,
        "cognitive": 7.8
      },
      "files": [
        {
          "path": "src/complex-file.ts",
          "cyclomatic": 25,
          "cognitive": 32
        }
      ]
    },
    "dependencies": {
      "total": 45,
      "circular": 2
    },
    "issues": {
      "errors": 3,
      "warnings": 12,
      "info": 8
    }
  }
}
```

### HTML Format

HTML reports provide rich, interactive presentations of the data with filtering, sorting, and visualization capabilities:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Code Analysis Report</title>
  <link rel="stylesheet" href="report.css">
  <script src="report.js"></script>
</head>
<body>
  <header>
    <h1>Code Analysis Report</h1>
    <p>Generated on June 15, 2023</p>
  </header>
  <main>
    <section id="complexity">
      <h2>Complexity Metrics</h2>
      <div class="chart" id="complexity-chart"></div>
      <table id="complexity-table">
        <!-- Complexity data -->
      </table>
    </section>
    <!-- Other sections -->
  </main>
  <script>
    // Initialize charts and tables
  </script>
</body>
</html>
```

### Markdown Format

Markdown reports provide a balance between readability and structure, suitable for documentation and GitHub:

```markdown
# Code Analysis Report

Generated on June 15, 2023

## Complexity Metrics

| File | Cyclomatic | Cognitive |
|------|------------|-----------|
| src/complex-file.ts | 25 | 32 |
| src/another-file.ts | 12 | 18 |

Average Cyclomatic Complexity: 5.2
Average Cognitive Complexity: 7.8

## Dependencies

Total Dependencies: 45
Circular Dependencies: 2

## Issues

### Errors (3)

- Error in src/file1.ts:25 - Missing return statement
- Error in src/file2.ts:42 - Undefined variable 'config'
- Error in src/file3.ts:78 - Type mismatch
```

## Custom Templates

You can create custom report templates to customize the output format and styling:

```typescript
import { Reporter } from '@solo-build/reporter';

// Create a custom HTML template
const customTemplate = {
  render(data, options) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${options.title || 'Report'}</title>
        <style>
          ${this.assets['styles.css']}
        </style>
      </head>
      <body>
        <header>
          <h1>${options.title || 'Report'}</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
        </header>
        <main>
          <!-- Custom report content -->
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </main>
        <script>
          ${this.assets['script.js']}
        </script>
      </body>
      </html>
    `;
  },
  assets: {
    'styles.css': `
      body { font-family: sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
      header { margin-bottom: 30px; }
      h1 { color: #333; }
    `,
    'script.js': `
      console.log('Custom report loaded');
    `
  }
};

// Register the custom template
const reporter = new Reporter();
reporter.registerTemplate('custom-html', customTemplate);

// Use the custom template
const report = await reporter.generateReport('analysis', analysisResults, {
  title: 'Custom Analysis Report',
  template: 'custom-html'
});
```

## CI/CD Integration

The Reporter integrates with CI/CD systems to provide build and analysis reports:

### GitHub Actions Integration

```yaml
# .github/workflows/build.yml
name: Build and Analyze

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npx solo analyze --reporter=github
      - run: npx solo build --reporter=github
```

### Jenkins Integration

```groovy
// Jenkinsfile
pipeline {
  agent any
  stages {
    stage('Build and Analyze') {
      steps {
        sh 'npm install'
        sh 'npx solo analyze --reporter=jenkins --output-dir=reports'
        sh 'npx solo build --reporter=jenkins --output-dir=reports'
      }
      post {
        always {
          publishHTML(target: [
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports',
            reportFiles: 'analysis.html,build.html',
            reportName: 'Solo Build Reports'
          ])
        }
      }
    }
  }
}
```

## Integration with Other Components

The Reporter works closely with other Solo Build components:

- **Analyzer**: Formats and presents analysis results
- **Transformer**: Reports on transformations applied to the code
- **Generator**: Reports on generated output files and sizes
- **Workflow Engine**: Reports on workflow execution status and results
- **Task Runner**: Reports on task execution status and performance
