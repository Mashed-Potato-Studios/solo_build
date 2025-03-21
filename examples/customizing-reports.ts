import { Reporter } from "../src/reporter";
import { Analyzer } from "../packages/analyser";
import { Parser } from "../packages/parser";
import * as path from "path";
import * as fs from "fs/promises";
import * as ejs from "ejs";

/**
 * Example showing how to customize report templates
 */
async function customizeReports() {
  console.log("Running customized reports example...");

  // Basic configuration
  const config = {
    projectRoot: path.resolve(__dirname, ".."),
    sourceDir: "src",
    outDir: "dist",
    target: "es2020",
    module: "commonjs",
    include: ["**/*.ts"],
    exclude: ["**/*.test.ts", "node_modules/**"],
    analyze: {
      complexity: true,
      dependencies: true,
      duplication: true,
      security: true,
    },
  };

  try {
    // Create custom templates directory
    const customTemplatesDir = path.join(__dirname, "custom-templates");
    await fs.mkdir(customTemplatesDir, { recursive: true });

    // Create a custom template for complexity report
    const customComplexityTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <title>Custom Complexity Report</title>
    <style>
      body { 
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        margin: 0; 
        padding: 0;
        background-color: #f5f5f5;
        color: #333;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
      header {
        background-color: #2c3e50;
        color: white;
        padding: 20px;
        margin-bottom: 30px;
        border-radius: 5px;
      }
      h1 {
        margin: 0;
        font-size: 24px;
      }
      .card {
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 20px;
        overflow: hidden;
      }
      .card-header {
        background-color: #3498db;
        color: white;
        padding: 15px 20px;
      }
      .card-body {
        padding: 20px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }
      th {
        background-color: #f2f2f2;
      }
      tr:hover {
        background-color: #f5f5f5;
      }
      .high { color: #e74c3c; }
      .medium { color: #f39c12; }
      .low { color: #27ae60; }
      .summary {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-bottom: 30px;
      }
      .metric {
        flex: 1;
        min-width: 200px;
        background-color: white;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        padding: 20px;
        text-align: center;
      }
      .metric-value {
        font-size: 36px;
        font-weight: bold;
        margin: 10px 0;
      }
      .chart {
        height: 300px;
        margin-top: 30px;
      }
      footer {
        text-align: center;
        margin-top: 50px;
        color: #7f8c8d;
        font-size: 14px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Custom Code Complexity Report</h1>
        <p>Generated on <%= new Date().toLocaleString() %></p>
      </header>
      
      <div class="summary">
        <div class="metric">
          <h3>Total Files</h3>
          <div class="metric-value"><%= Object.keys(complexity).length %></div>
        </div>
        <div class="metric">
          <h3>Average Complexity</h3>
          <div class="metric-value">
            <%= (Object.values(complexity).reduce((sum, val) => sum + val, 0) / 
                Math.max(1, Object.keys(complexity).length)).toFixed(1) %>
          </div>
        </div>
        <div class="metric">
          <h3>High Complexity Files</h3>
          <div class="metric-value">
            <%= Object.values(complexity).filter(val => val > 15).length %>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="card-header">
          <h2>File Complexity Table</h2>
        </div>
        <div class="card-body">
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Complexity</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              <% Object.entries(complexity)
                 .sort(([, a], [, b]) => b - a)
                 .forEach(([file, value]) => {
                   let level = 'low';
                   let levelClass = 'low';
                   if (value > 15) {
                     level = 'high';
                     levelClass = 'high';
                   } else if (value > 10) {
                     level = 'medium';
                     levelClass = 'medium';
                   }
              %>
                <tr>
                  <td><%= file %></td>
                  <td><%= value %></td>
                  <td class="<%= levelClass %>"><%= level.toUpperCase() %></td>
                </tr>
              <% }); %>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="chart">
        <div class="card">
          <div class="card-header">
            <h2>Complexity Distribution</h2>
          </div>
          <div class="card-body">
            <div id="complexityChart">
              <!-- Placeholder for chart - in a real implementation, you would include a chart library -->
              <p>A chart would be displayed here showing the distribution of complexity across files.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer>
        <p>Generated by Custom Reporter | Solo Build v4</p>
      </footer>
    </div>
  </body>
</html>`;

    // Write the custom template to file
    await fs.writeFile(
      path.join(customTemplatesDir, "complexity.ejs"),
      customComplexityTemplate
    );

    // Create a custom Reporter class that extends the original
    class CustomReporter extends Reporter {
      constructor(config) {
        super(config);
        // Override the template directory to use our custom templates
        this.templateDir = customTemplatesDir;
      }

      // You can also override specific methods to customize the reports
      async generateComplexityReport(analysis, format) {
        // For non-HTML formats, use the parent implementation
        if (format !== "html") {
          return super.generateComplexityReport(analysis, format);
        }

        // For HTML format, use our custom template
        try {
          const templatePath = path.join(this.templateDir, "complexity.ejs");
          const template = await fs.readFile(templatePath, "utf8");
          const content = ejs.render(template, {
            complexity: analysis.complexity,
          });

          return {
            name: `custom-complexity-${format}`,
            content,
            format,
          };
        } catch (error) {
          console.error("Error generating custom complexity report:", error);
          // Fall back to parent implementation
          return super.generateComplexityReport(analysis, format);
        }
      }
    }

    // Initialize components
    const parser = new Parser(config);
    const analyzer = new Analyzer(config);
    const reporter = new CustomReporter(config);

    // Parse source files
    console.log("Parsing source files...");
    const parseResult = await parser.parseFiles();

    // Analyze code
    console.log("Analyzing code...");
    const analysisResult = await analyzer.analyze(parseResult.ast);

    // Generate reports
    console.log("Generating custom reports...");
    const reports = await reporter.generateReports(analysisResult, {
      duration: 1500,
      stats: {
        files: parseResult.files?.length || 0,
        totalSize: parseResult.totalSize || 0,
      },
    });

    console.log(`Generated ${reports.length} reports`);
    console.log(
      "Check the reports directory to see the custom complexity report!"
    );
  } catch (error) {
    console.error("Error customizing reports:", error);
  }
}

// Run the example
customizeReports().catch(console.error);

/**
 * How to run this example:
 *
 * 1. Make sure you've built the project:
 *    npm run build
 *
 * 2. Run this example:
 *    ts-node examples/customizing-reports.ts
 *
 * 3. Check the reports directory for the custom complexity report (custom-complexity-html.html)
 */
