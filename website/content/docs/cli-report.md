# Report Command

The `report` command helps you manage and view the reports generated by the `analyze` command. It provides easy access to your code analysis reports, allowing you to list all available reports and open them in your browser.

## Usage

```bash
solo-build report <subcommand> [options]
```

## Subcommands

### list

Lists all the reports that have been generated.

```bash
solo-build report list [options]
```

#### Options

| Option  | Type     | Default   | Description                      |
| ------- | -------- | --------- | -------------------------------- |
| `--dir` | `string` | `reports` | Directory containing the reports |

#### Example

```bash
# List all reports in the default directory
solo-build report list

# List reports in a custom directory
solo-build report list --dir ./my-reports
```

### open

Opens a report in your default web browser.

```bash
solo-build report open [options]
```

#### Options

| Option     | Type     | Default              | Description                      |
| ---------- | -------- | -------------------- | -------------------------------- |
| `--report` | `string` | `build-summary.html` | The report file to open          |
| `--dir`    | `string` | `reports`            | Directory containing the reports |

#### Example

```bash
# Open the default summary report
solo-build report open

# Open a specific report
solo-build report open --report complexity-html.html

# Open a report from a custom directory
solo-build report open --report issues-html.html --dir ./my-reports
```

## Description

The `report` command is a companion to the `analyze` command, designed to help you work with the reports generated during code analysis. It provides a convenient way to:

1. **Discover Reports**: Quickly see all available reports with the `list` subcommand
2. **View Reports**: Open any report directly in your browser with the `open` subcommand
3. **Navigate Different Formats**: Work with HTML, JSON, and Markdown report formats

This command streamlines the workflow of analyzing your code and reviewing the results, making it easier to gain insights from your codebase analysis.

## Report Types

The reports you can manage with this command include:

| Report Prefix   | Description                               |
| --------------- | ----------------------------------------- |
| `complexity-`   | Code complexity metrics and analysis      |
| `issues-`       | Code issues and recommendations           |
| `dependencies-` | Module dependencies and relationships     |
| `performance-`  | Build performance metrics                 |
| `build-summary` | Overall summary with score and highlights |

## Report Formats

Reports are available in multiple formats, which you can identify by their file extensions:

| Extension   | Format   | Description                                  |
| ----------- | -------- | -------------------------------------------- |
| `.html`     | HTML     | Interactive reports with visualizations      |
| `.json`     | JSON     | Machine-readable data for further processing |
| `.markdown` | Markdown | Text-based reports for documentation         |

## Examples

### Listing All Reports

```bash
# List all reports
solo-build report list
```

Example output:

```
Found 12 reports:

complexity reports:
  - complexity-html.html
  - complexity-json.json
  - complexity-markdown.markdown

issues reports:
  - issues-html.html
  - issues-json.json
  - issues-markdown.markdown

dependencies reports:
  - dependencies-html.html
  - dependencies-json.json
  - dependencies-markdown.markdown

other reports:
  - build-summary.html
  - complexity-visualization.html
  - dependency-visualization.html
```

### Opening the Summary Report

```bash
# Open the summary report in your browser
solo-build report open
```

### Opening a Specific Report

```bash
# Open the complexity visualization
solo-build report open --report complexity-visualization.html
```

## Integration with Analyze Command

The report command works seamlessly with the analyze command workflow:

```bash
# First, run the analysis
solo-build analyze --format html,json --report-type complexity,issues

# Then, list the generated reports
solo-build report list

# Finally, open a specific report to view the results
solo-build report open --report complexity-html.html
```

## Related Commands

- [`analyze`](/docs/cli-analyze): Run code analysis and generate reports
- [`run`](/docs/cli-run): Run the full Solo Build process
