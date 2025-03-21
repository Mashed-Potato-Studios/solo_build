// examples/reporter-usage.ts
import { Reporter } from "../src/reporter";
import { Analyzer } from "../packages/analyser";
import { Parser } from "../packages/parser";
import * as path from "path";
import * as fs from "fs/promises";

// Example configuration
const config = {
  projectRoot: path.resolve(__dirname, ".."),
  sourceDir: "src",
  outDir: "dist",
  target: "es2020",
  module: "commonjs",
  minify: true,
  sourceMaps: true,
  include: ["**/*.ts"],
  exclude: ["**/*.test.ts", "node_modules/**"],
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: true,
    security: true,
  },
  tasks: {},
};

/**
 * Example showing how to use the Reporter component
 */
async function runExample() {
  console.log("Running Reporter example...");

  try {
    // Initialize components
    const parser = new Parser(config);
    const analyzer = new Analyzer(config);
    const reporter = new Reporter(config);

    // Parse source files
    console.log("Parsing source files...");
    const parseResult = await parser.parseFiles();

    // Analyze code
    console.log("Analyzing code...");
    const analysisResult = await analyzer.analyze(parseResult.ast);

    // Add a mock build result
    const buildResult = {
      duration: 1250, // 1.25 seconds
      stats: {
        files: 25,
        totalSize: 125000,
        outputSize: 85000,
        compressionRatio: 0.68,
      },
    };

    // Generate reports
    console.log("Generating reports...");
    const reports = await reporter.generateReports(analysisResult, buildResult);

    console.log(`Generated ${reports.length} reports`);
    console.log("Reports saved to:", path.join(config.projectRoot, "reports"));

    // Example of accessing report content
    const summaryReport = reports.find((r) => r.name === "build-summary");
    if (summaryReport) {
      console.log("\nSummary Report Preview:");
      if (summaryReport.format === "html") {
        // For HTML reports, just show a snippet
        console.log("HTML report generated. Open in browser to view.");
      } else {
        // For other formats, show the content
        console.log(summaryReport.content.substring(0, 500) + "...");
      }
    }

    // Example of using reports programmatically
    const complexityJson = reports.find((r) => r.name === "complexity-json");
    if (complexityJson) {
      const complexityData = JSON.parse(complexityJson.content);

      // Find the most complex file
      const mostComplexFile = Object.entries(complexityData)
        .sort(([, a], [, b]) => (b as number) - (a as number))
        .shift();

      if (mostComplexFile) {
        console.log(
          "\nMost complex file:",
          mostComplexFile[0],
          "with complexity score:",
          mostComplexFile[1]
        );
      }
    }
  } catch (error) {
    console.error("Error running example:", error);
  }
}

// Run the example
runExample().catch(console.error);

/**
 * How to run this example:
 *
 * 1. Make sure you've built the project:
 *    npm run build
 *
 * 2. Run this example:
 *    ts-node examples/reporter-usage.ts
 *
 * 3. Check the reports directory for generated reports
 */
