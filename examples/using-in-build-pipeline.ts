import { build } from "../src/index";
import * as path from "path";

/**
 * Example showing how to integrate reporting into a build pipeline
 */
async function runBuildWithReporting() {
  // Define build configuration with reporting options
  const config = {
    projectRoot: path.resolve(__dirname, "../test-project"),
    sourceDir: "src",
    outDir: "dist",
    target: "es2020",
    module: "commonjs",
    minify: true,
    sourceMaps: true,
    include: ["**/*.ts"],
    exclude: ["**/*.test.ts", "node_modules/**"],

    // Analysis configuration is important for generating useful reports
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
    },

    // Task configuration for pre and post-build tasks
    tasks: {
      "pre-build": {
        type: "command",
        command: "rimraf dist",
      },
      "post-build": {
        type: "function",
        function: "openReports",
      },
    },
  };

  console.log("Starting build with reporting...");

  try {
    // Run the build process
    const result = await build(config);

    if (result.success) {
      console.log(`Build completed successfully in ${result.duration}ms`);
      console.log(`Generated ${result.files?.length || 0} files`);

      if (result.reports) {
        console.log(`Generated ${result.reports.length} reports:`);

        // Group reports by type
        const reportsByType = result.reports.reduce((groups, report) => {
          const type = report.name.split("-")[0];
          if (!groups[type]) groups[type] = [];
          groups[type].push(report);
          return groups;
        }, {});

        // List reports by type
        Object.entries(reportsByType).forEach(([type, reports]) => {
          console.log(`- ${type} reports (${reports.length}):`);
          reports.forEach((report) => {
            console.log(`  - ${report.name}.${report.format}`);
          });
        });

        // Show path to HTML summary report
        const summaryReport = result.reports.find(
          (r) => r.name === "build-summary" && r.format === "html"
        );
        if (summaryReport) {
          console.log(
            `\nSummary report: ${path.join(
              config.projectRoot,
              "reports",
              `build-summary.html`
            )}`
          );
          console.log("Open this file in a browser to view the full report");
        }
      }

      // Display architecture score if available
      if (result.analysis) {
        console.log(`\nArchitecture score: ${result.analysis.score}/100`);

        // Show insights
        if (result.analysis.insights && result.analysis.insights.length > 0) {
          console.log("\nKey insights:");
          result.analysis.insights
            .filter((insight) => insight.importance === "high")
            .forEach((insight) => {
              console.log(`- ${insight.description}`);
            });
        }
      }
    } else {
      console.error(`Build failed: ${result.error}`);
    }
  } catch (error) {
    console.error("Build process error:", error);
  }
}

// Run the example
runBuildWithReporting().catch(console.error);

/**
 * How to run this example:
 *
 * 1. Make sure you've built the project and set up a test project:
 *    npm run build
 *    mkdir -p test-project/src
 *    touch test-project/src/index.ts
 *
 * 2. Run this example:
 *    ts-node examples/using-in-build-pipeline.ts
 *
 * 3. Check the test-project/reports directory for generated reports
 */
