// src/reporter/index.ts
import * as fs from "fs/promises";
import * as path from "path";
import { BuildConfig, AnalysisResult, Issue } from "../../types";
import consola from "consola";
// Add dependencies for HTML and visualization
import * as ejs from "ejs";
import * as d3 from "d3";
import * as marked from "marked";

export interface Report {
  name: string;
  content: string;
  format: "json" | "html" | "markdown" | "text";
}

export interface ReporterConfig {
  formats?: ("json" | "html" | "markdown")[];
  types?: ("complexity" | "issues" | "dependencies" | "performance")[];
  outputDir?: string;
  includeVisualizations?: boolean;
}

export class Reporter {
  private config: BuildConfig;
  private templateDir: string;
  private reporterConfig: ReporterConfig = {
    formats: ["json", "html", "markdown"],
    types: ["complexity", "issues", "dependencies", "performance"],
    outputDir: "reports",
    includeVisualizations: true,
  };

  constructor(config: BuildConfig) {
    this.config = config;
    this.templateDir = path.join(__dirname, "templates");

    // Initialize from config if available
    if (config.reports) {
      this.configure(config.reports);
    }
  }

  /**
   * Configure the reporter with custom settings
   */
  configure(config: ReporterConfig): void {
    this.reporterConfig = {
      ...this.reporterConfig,
      ...config,
    };
  }

  async generateReports(
    analysis: AnalysisResult,
    buildResult?: { duration: number; stats: any }
  ): Promise<Report[]> {
    consola.info("Generating reports...");

    const reports: Report[] = [];

    // Create reports directory if it doesn't exist
    const reportsDir = path.join(
      this.config.projectRoot,
      this.reporterConfig.outputDir || "reports"
    );
    await fs.mkdir(reportsDir, { recursive: true });

    // Generate reports based on configured types
    const types = this.reporterConfig.types || [
      "complexity",
      "issues",
      "dependencies",
      "performance",
    ];
    const formats = this.reporterConfig.formats || ["json", "html", "markdown"];

    // Generate complexity reports if enabled
    if (types.includes("complexity")) {
      for (const format of formats) {
        const report = await this.generateComplexityReport(analysis, format);
        reports.push(report);
      }
    }

    // Generate issues reports if enabled
    if (types.includes("issues")) {
      for (const format of formats) {
        const report = await this.generateIssuesReport(analysis, format);
        reports.push(report);
      }
    }

    // Generate dependencies reports if enabled
    if (types.includes("dependencies")) {
      for (const format of formats) {
        const report = await this.generateDependenciesReport(analysis, format);
        reports.push(report);
      }
    }

    // Generate performance reports if enabled
    if (types.includes("performance") && buildResult) {
      for (const format of formats) {
        const report = await this.generatePerformanceReport(
          analysis,
          buildResult,
          format
        );
        reports.push(report);
      }
    }

    // Generate visualizations if enabled
    if (this.reporterConfig.includeVisualizations) {
      const complexityVisualization =
        this.generateComplexityVisualization(analysis);
      reports.push(complexityVisualization);

      const dependencyVisualization =
        this.generateDependencyVisualization(analysis);
      reports.push(dependencyVisualization);
    }

    // Always generate build summary report (HTML only)
    const summaryReport = await this.generateSummaryReport(
      analysis,
      buildResult,
      "html"
    );
    reports.push(summaryReport);

    // Write reports to files
    for (const report of reports) {
      const reportPath = path.join(
        reportsDir,
        `${report.name}.${report.format}`
      );
      await fs.writeFile(reportPath, report.content, "utf8");
    }

    consola.success(`Generated ${reports.length} reports in ${reportsDir}`);

    return reports;
  }

  private async generateComplexityReport(
    analysis: AnalysisResult,
    format: "json" | "html" | "markdown"
  ): Promise<Report> {
    const name = `complexity-${format}`;
    let content = "";

    switch (format) {
      case "json":
        content = JSON.stringify(analysis.complexity, null, 2);
        break;
      case "html":
        // Use EJS template for HTML report
        try {
          const templatePath = path.join(this.templateDir, "complexity.ejs");
          const template = await fs.readFile(templatePath, "utf8");
          content = ejs.render(template, { complexity: analysis.complexity });
        } catch (error) {
          // Fallback to the old method if template can't be loaded
          content = this.generateComplexityHtml(analysis);
        }
        break;
      case "markdown":
        // Generate Markdown report for complexity
        content = this.generateComplexityMarkdown(analysis);
        break;
    }

    return {
      name,
      content,
      format,
    };
  }

  private async generateIssuesReport(
    analysis: AnalysisResult,
    format: "json" | "html" | "markdown"
  ): Promise<Report> {
    const name = `issues-${format}`;
    let content = "";

    switch (format) {
      case "json":
        content = JSON.stringify(analysis.issues, null, 2);
        break;
      case "html":
        // Generate HTML report for issues
        content = this.generateIssuesHtml(analysis);
        break;
      case "markdown":
        // Generate Markdown report for issues
        content = this.generateIssuesMarkdown(analysis);
        break;
    }

    return {
      name,
      content,
      format,
    };
  }

  private async generateDependenciesReport(
    analysis: AnalysisResult,
    format: "json" | "html" | "markdown"
  ): Promise<Report> {
    const name = `dependencies-${format}`;
    let content = "";

    switch (format) {
      case "json":
        content = JSON.stringify(analysis.dependencies, null, 2);
        break;
      case "html":
        // Generate HTML report for dependencies
        content = this.generateDependenciesHtml(analysis);
        break;
      case "markdown":
        // Generate Markdown report for dependencies
        content = this.generateDependenciesMarkdown(analysis);
        break;
    }

    return {
      name,
      content,
      format,
    };
  }

  private async generatePerformanceReport(
    analysis: AnalysisResult,
    buildResult: { duration: number; stats: any },
    format: "json" | "html" | "markdown"
  ): Promise<Report> {
    const name = `performance-${format}`;
    let content = "";

    const performanceData = {
      buildTime: buildResult.duration,
      moduleCount: Object.keys(analysis.dependencies).length,
      totalComplexity: Object.values(analysis.complexity).reduce(
        (sum, value) => sum + value,
        0
      ),
      averageComplexity:
        Object.values(analysis.complexity).reduce(
          (sum, value) => sum + value,
          0
        ) / Math.max(1, Object.keys(analysis.complexity).length),
      buildStats: buildResult.stats || {},
    };

    switch (format) {
      case "json":
        content = JSON.stringify(performanceData, null, 2);
        break;
      case "html":
        // Use EJS template for performance report
        try {
          const templatePath = path.join(this.templateDir, "performance.ejs");
          const template = await fs.readFile(templatePath, "utf8");
          content = ejs.render(template, performanceData);
        } catch (error) {
          // Fallback to the old method if template can't be loaded
          content = this.generatePerformanceHtml(performanceData);
        }
        break;
      case "markdown":
        // Generate Markdown report for performance
        content = this.generatePerformanceMarkdown(performanceData);
        break;
    }

    return {
      name,
      content,
      format,
    };
  }

  private generateComplexityVisualization(analysis: AnalysisResult): Report {
    // Generate D3-based visualization for complexity
    const data = Object.entries(analysis.complexity)
      .map(([file, complexity]) => ({
        name: path.basename(file),
        value: complexity,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 20); // Top 20 most complex files

    const svgContent = this.generateComplexityChart(data);

    return {
      name: "complexity-visualization",
      content: svgContent,
      format: "html",
    };
  }

  private generateDependencyVisualization(analysis: AnalysisResult): Report {
    // Generate D3-based visualization for dependencies
    const nodes: { id: string }[] = [];
    const links: { source: string; target: string }[] = [];

    // Create nodes for all files
    Object.keys(analysis.dependencies).forEach((file) => {
      const id = path.basename(file);
      if (!nodes.some((n) => n.id === id)) {
        nodes.push({ id });
      }
    });

    // Create links between files based on dependencies
    Object.entries(analysis.dependencies).forEach(([file, deps]) => {
      const sourceId = path.basename(file);
      deps.forEach((dep) => {
        const targetId = path.basename(dep);
        if (nodes.some((n) => n.id === targetId)) {
          links.push({ source: sourceId, target: targetId });
        }
      });
    });

    const svgContent = this.generateDependencyGraph({ nodes, links });

    return {
      name: "dependency-visualization",
      content: svgContent,
      format: "html",
    };
  }

  private async generateSummaryReport(
    analysis: AnalysisResult,
    buildResult?: { duration: number; stats: any },
    format: "html" | "markdown" = "html"
  ): Promise<Report> {
    // Generate a summary report with recommendations
    const issueCount = Object.values(analysis.issues).reduce(
      (sum, issues) => sum + issues.length,
      0
    );
    const fileCount = Object.keys(analysis.complexity).length;

    // Calculate metrics
    const highComplexityFiles = Object.entries(analysis.complexity)
      .filter(([, complexity]) => complexity > 10)
      .map(([file]) => file);

    const recommendations = [
      ...highComplexityFiles.map(
        (file) =>
          `Consider refactoring ${path.basename(file)} due to high complexity`
      ),
      ...(analysis.architecture.suggestions || []),
    ];

    const summaryData = {
      score: analysis.score,
      fileCount,
      issueCount,
      buildTime: buildResult?.duration || 0,
      recommendations,
      insights: analysis.insights || [],
    };

    let content = "";

    if (format === "html") {
      try {
        const templatePath = path.join(this.templateDir, "summary.ejs");
        const template = await fs.readFile(templatePath, "utf8");
        content = ejs.render(template, summaryData);
      } catch (error) {
        // Fallback to the old method if template can't be loaded
        content = this.generateSummaryHtml(summaryData);
      }
    } else {
      content = this.generateSummaryMarkdown(summaryData);
    }

    return {
      name: "build-summary",
      content,
      format,
    };
  }

  // Helper methods for generating HTML content
  private generateComplexityHtml(analysis: AnalysisResult): string {
    // Simple HTML template for complexity report
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Code Complexity Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; text-align: left; }
            .high { background-color: #ffdddd; }
            .medium { background-color: #ffffcc; }
            .low { background-color: #ddffdd; }
          </style>
        </head>
        <body>
          <h1>Code Complexity Report</h1>
          <table>
            <tr>
              <th>File</th>
              <th>Complexity</th>
              <th>Level</th>
            </tr>
            ${Object.entries(analysis.complexity)
              .sort(([, a], [, b]) => b - a)
              .map(([file, complexity]) => {
                let level = "low";
                if (complexity > 15) level = "high";
                else if (complexity > 10) level = "medium";

                return `
                  <tr class="${level}">
                    <td>${file}</td>
                    <td>${complexity}</td>
                    <td>${level}</td>
                  </tr>
                `;
              })
              .join("")}
          </table>
        </body>
      </html>
    `;
  }

  private generateIssuesHtml(analysis: AnalysisResult): string {
    // Simple HTML template for issues report
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Code Issues Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .file { margin-bottom: 20px; }
            .issue { margin-bottom: 10px; padding: 10px; border-left: 4px solid #ccc; }
            .error { border-left-color: #ff0000; }
            .warning { border-left-color: #ffcc00; }
            .info { border-left-color: #0099ff; }
          </style>
        </head>
        <body>
          <h1>Code Issues Report</h1>
          ${Object.entries(analysis.issues)
            .map(
              ([file, issues]) => `
            <div class="file">
              <h2>${file}</h2>
              ${
                issues.length > 0
                  ? issues
                      .map(
                        (issue) => `
                <div class="issue ${issue.type || "info"}">
                  <strong>${issue.type}</strong> (Line ${issue.line}): ${
                          issue.message
                        }
                  ${
                    issue.fix
                      ? `<p><strong>Suggestion:</strong> Fix available</p>`
                      : ""
                  }
                </div>
              `
                      )
                      .join("")
                  : "<p>No issues found</p>"
              }
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `;
  }

  private generateDependenciesHtml(analysis: AnalysisResult): string {
    // Simple HTML template for dependencies report
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dependencies Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .file { margin-bottom: 20px; }
            ul { padding-left: 20px; }
          </style>
        </head>
        <body>
          <h1>Dependencies Report</h1>
          ${Object.entries(analysis.dependencies)
            .map(
              ([file, deps]) => `
            <div class="file">
              <h2>${file}</h2>
              <ul>
                ${deps.map((dep) => `<li>${dep}</li>`).join("")}
              </ul>
            </div>
          `
            )
            .join("")}
        </body>
      </html>
    `;
  }

  private generatePerformanceHtml(performanceData: any): string {
    // Simple HTML template for performance report
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Performance Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .metric { margin-bottom: 10px; padding: 10px; background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <h1>Build Performance Report</h1>
          
          <div class="metric">
            <strong>Build Time:</strong> ${performanceData.buildTime}ms
          </div>
          
          <div class="metric">
            <strong>Module Count:</strong> ${performanceData.moduleCount}
          </div>
          
          <div class="metric">
            <strong>Total Complexity:</strong> ${
              performanceData.totalComplexity
            }
          </div>
          
          <div class="metric">
            <strong>Average Complexity:</strong> ${performanceData.averageComplexity.toFixed(
              2
            )}
          </div>
          
          <h2>Build Statistics</h2>
          <pre>${JSON.stringify(performanceData.buildStats, null, 2)}</pre>
        </body>
      </html>
    `;
  }

  private generateSummaryHtml(summaryData: any): string {
    // Simple HTML template for summary report
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Build Summary Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .score { font-size: 48px; font-weight: bold; text-align: center; margin: 20px; }
            .good { color: #00cc00; }
            .medium { color: #ffcc00; }
            .bad { color: #ff0000; }
            .section { margin-bottom: 20px; }
            .recommendation { padding: 10px; margin-bottom: 5px; background-color: #f5f5f5; }
            .insight { padding: 10px; margin-bottom: 5px; background-color: #e6f7ff; }
          </style>
        </head>
        <body>
          <h1>Build Summary Report</h1>
          
          <div class="score ${
            summaryData.score > 80
              ? "good"
              : summaryData.score > 60
              ? "medium"
              : "bad"
          }">
            ${summaryData.score}/100
          </div>
          
          <div class="section">
            <h2>Overview</h2>
            <p><strong>Total Files:</strong> ${summaryData.fileCount}</p>
            <p><strong>Total Issues:</strong> ${summaryData.issueCount}</p>
            <p><strong>Build Time:</strong> ${summaryData.buildTime}ms</p>
          </div>
          
          <div class="section">
            <h2>Recommendations</h2>
            ${
              summaryData.recommendations.length > 0
                ? summaryData.recommendations
                    .map(
                      (rec: string) =>
                        `<div class="recommendation">${rec}</div>`
                    )
                    .join("")
                : "<p>No recommendations</p>"
            }
          </div>
          
          <div class="section">
            <h2>Insights</h2>
            ${
              summaryData.insights.length > 0
                ? summaryData.insights
                    .map(
                      (insight: any) => `
                <div class="insight">
                  <strong>${insight.importance}:</strong> ${insight.description}
                </div>
              `
                    )
                    .join("")
                : "<p>No insights available</p>"
            }
          </div>
        </body>
      </html>
    `;
  }

  // Markdown generation methods
  private generateComplexityMarkdown(analysis: AnalysisResult): string {
    let markdown = "# Code Complexity Report\n\n";

    markdown += "| File | Complexity | Level |\n";
    markdown += "|------|------------|-------|\n";

    Object.entries(analysis.complexity)
      .sort(([, a], [, b]) => b - a)
      .forEach(([file, complexity]) => {
        let level = "low";
        if (complexity > 15) level = "high";
        else if (complexity > 10) level = "medium";

        markdown += `| ${file} | ${complexity} | ${level} |\n`;
      });

    return markdown;
  }

  private generateIssuesMarkdown(analysis: AnalysisResult): string {
    let markdown = "# Code Issues Report\n\n";

    Object.entries(analysis.issues).forEach(([file, issues]) => {
      markdown += `## ${file}\n\n`;

      if (issues.length === 0) {
        markdown += "No issues found\n\n";
      } else {
        issues.forEach((issue) => {
          markdown += `- **${issue.type}** (Line ${issue.line}): ${issue.message}\n`;
          if (issue.fix) {
            markdown += `  - Suggestion: Fix available\n`;
          }
        });
        markdown += "\n";
      }
    });

    return markdown;
  }

  private generateDependenciesMarkdown(analysis: AnalysisResult): string {
    let markdown = "# Dependencies Report\n\n";

    Object.entries(analysis.dependencies).forEach(([file, deps]) => {
      markdown += `## ${file}\n\n`;

      deps.forEach((dep) => {
        markdown += `- ${dep}\n`;
      });

      markdown += "\n";
    });

    return markdown;
  }

  private generatePerformanceMarkdown(performanceData: any): string {
    let markdown = "# Build Performance Report\n\n";

    markdown += `- **Build Time:** ${performanceData.buildTime}ms\n`;
    markdown += `- **Module Count:** ${performanceData.moduleCount}\n`;
    markdown += `- **Total Complexity:** ${performanceData.totalComplexity}\n`;
    markdown += `- **Average Complexity:** ${performanceData.averageComplexity.toFixed(
      2
    )}\n\n`;

    markdown += "## Build Statistics\n\n";
    markdown += "```json\n";
    markdown += JSON.stringify(performanceData.buildStats, null, 2);
    markdown += "\n```\n";

    return markdown;
  }

  private generateSummaryMarkdown(summaryData: any): string {
    let markdown = "# Build Summary Report\n\n";

    markdown += `## Overall Score: ${summaryData.score}/100\n\n`;

    markdown += "## Overview\n\n";
    markdown += `- **Total Files:** ${summaryData.fileCount}\n`;
    markdown += `- **Total Issues:** ${summaryData.issueCount}\n`;
    markdown += `- **Build Time:** ${summaryData.buildTime}ms\n\n`;

    markdown += "## Recommendations\n\n";

    if (summaryData.recommendations.length > 0) {
      summaryData.recommendations.forEach((rec: string) => {
        markdown += `- ${rec}\n`;
      });
    } else {
      markdown += "No recommendations\n";
    }

    markdown += "\n## Insights\n\n";

    if (summaryData.insights.length > 0) {
      summaryData.insights.forEach((insight: any) => {
        markdown += `- **${insight.importance}:** ${insight.description}\n`;
      });
    } else {
      markdown += "No insights available\n";
    }

    return markdown;
  }

  // D3 visualization helpers
  private generateComplexityChart(
    data: { name: string; value: number }[]
  ): string {
    // A simple bar chart SVG for complexity visualization
    const width = 800;
    const height = 500;
    const margin = { top: 30, right: 30, bottom: 100, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Calculate scales
    const maxValue = Math.max(...data.map((d) => d.value));
    const barWidth = chartWidth / data.length;

    // Generate SVG content
    let svg = `
      <div style="overflow-x: auto;">
        <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(${margin.left}, ${margin.top})">
            <text x="${
              chartWidth / 2
            }" y="-10" text-anchor="middle" font-weight="bold">File Complexity</text>
            
            <!-- Y Axis -->
            <line x1="0" y1="0" x2="0" y2="${chartHeight}" stroke="black" />
            ${Array.from({ length: 6 }, (_, i) => {
              const y = chartHeight - (i * chartHeight) / 5;
              const value = Math.round((maxValue * i) / 5);
              return `
                <line x1="-5" y1="${y}" x2="${chartWidth}" y2="${y}" stroke="#ddd" />
                <text x="-10" y="${y + 5}" text-anchor="end">${value}</text>
              `;
            }).join("")}
            
            <!-- Bars -->
            ${data
              .map((d, i) => {
                const barHeight = (d.value / maxValue) * chartHeight;
                const x = i * barWidth;
                const y = chartHeight - barHeight;
                let color = "#4caf50"; // green for low complexity
                if (d.value > 15) color = "#f44336"; // red for high
                else if (d.value > 10) color = "#ff9800"; // orange for medium

                return `
                <rect x="${x + 5}" y="${y}" width="${
                  barWidth - 10
                }" height="${barHeight}" fill="${color}" />
                <text x="${x + barWidth / 2}" y="${
                  chartHeight + 20
                }" text-anchor="end" transform="rotate(-45, ${
                  x + barWidth / 2
                }, ${chartHeight + 20})">${d.name}</text>
              `;
              })
              .join("")}
          </g>
        </svg>
      </div>
    `;

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Complexity Visualization</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
          </style>
        </head>
        <body>
          <h1>Code Complexity Visualization</h1>
          ${svg}
        </body>
      </html>
    `;
  }

  private generateDependencyGraph(data: {
    nodes: any[];
    links: any[];
  }): string {
    // A simple force-directed graph SVG for dependency visualization
    const width = 800;
    const height = 600;

    // Create a simple force-directed graph as HTML with embedded JS
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Dependency Visualization</title>
          <script src="https://d3js.org/d3.v7.min.js"></script>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .node { fill: #69b3a2; }
            .link { stroke: #ddd; stroke-width: 1px; }
          </style>
        </head>
        <body>
          <h1>Dependency Graph Visualization</h1>
          <div id="graph"></div>
          
          <script>
            // Graph data
            const data = ${JSON.stringify(data)};
            
            // Create a force simulation
            const simulation = d3.forceSimulation(data.nodes)
              .force("link", d3.forceLink(data.links).id(d => d.id).distance(100))
              .force("charge", d3.forceManyBody().strength(-300))
              .force("center", d3.forceCenter(${width / 2}, ${height / 2}));
            
            // Create the SVG container
            const svg = d3.select("#graph")
              .append("svg")
              .attr("width", ${width})
              .attr("height", ${height});
            
            // Add links
            const link = svg.append("g")
              .selectAll("line")
              .data(data.links)
              .enter()
              .append("line")
              .attr("class", "link");
            
            // Add nodes
            const node = svg.append("g")
              .selectAll("circle")
              .data(data.nodes)
              .enter()
              .append("circle")
              .attr("class", "node")
              .attr("r", 5)
              .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
            
            // Add labels
            const label = svg.append("g")
              .selectAll("text")
              .data(data.nodes)
              .enter()
              .append("text")
              .text(d => d.id)
              .attr("font-size", "10px")
              .attr("dx", 12)
              .attr("dy", 4);
            
            // Update positions on simulation tick
            simulation.on("tick", () => {
              link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);
              
              node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
              
              label
                .attr("x", d => d.x)
                .attr("y", d => d.y);
            });
            
            // Drag functions
            function dragstarted(event, d) {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }
            
            function dragged(event, d) {
              d.fx = event.x;
              d.fy = event.y;
            }
            
            function dragended(event, d) {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }
          </script>
        </body>
      </html>
    `;
  }
}
