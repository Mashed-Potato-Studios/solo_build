#!/usr/bin/env node
// src/cli.ts
/// <reference path="../types/bun.d.ts" />
import { defineCommand, runMain } from "citty";
import consola from "consola";
import { resolve } from "pathe";
import { readFile } from "fs/promises";
import { loadConfig } from "c12";
import { defu } from "defu";
import { BuildConfig } from "../types";
import { build } from "./index";
import { FrameworkDetector } from "./framework-detector";
import { WorkflowEngine } from "./workflow";
import { version } from "../package.json";
import path from "path";
import fs from "fs";

// Helper function to ensure string type
function ensureString(value: string | boolean | string[]): string {
  if (Array.isArray(value)) {
    return value.join(",");
  }
  return String(value);
}

// Default configuration
const defaultConfig: Partial<BuildConfig> = {
  projectRoot: process.cwd(),
  sourceDir: "src",
  outDir: "dist",
  target: "es2020",
  module: "commonjs",
  minify: true,
  sourceMaps: true,
  include: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
  exclude: [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/*.test.*",
    "**/*.spec.*",
  ],
  tasks: {},
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: false,
    security: true,
  },
};

// Main command
const main = defineCommand({
  meta: {
    name: "solo-build",
    version,
    description: "AI-powered build system with architectural awareness",
  },
  subCommands: {
    init: defineCommand({
      meta: {
        name: "init",
        description: "Initialize a new project configuration",
      },
      args: {
        path: {
          type: "string",
          description: "Project path",
          default: ".",
        },
      },
      async run({ args }) {
        const projectPath = resolve(process.cwd(), ensureString(args.path));
        consola.info(`Initializing project in ${projectPath}`);

        // Detect framework
        const detector = new FrameworkDetector(projectPath);
        const detectionResult = await detector.detect();

        consola.info(`Detected framework: ${detectionResult.framework}`);
        consola.info(`Detected language: ${detectionResult.language}`);

        // Create default configuration
        const config = defu(
          {
            projectRoot: projectPath,
            sourceDir: detectionResult.framework === "nextjs" ? "pages" : "src",
            // Customize based on detected framework
            include:
              detectionResult.framework === "react"
                ? ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"]
                : ["**/*.ts", "**/*.js"],
          },
          defaultConfig
        );

        // Write configuration file
        const configPath = resolve(projectPath, "solo-build.config.js");
        const configContent = `// solo-build.config.js
module.exports = ${JSON.stringify(config, null, 2)}
`;

        try {
          await Bun.write(configPath, configContent);
          consola.success(`Configuration created at ${configPath}`);

          // Create workflow directory
          const workflowsDir = resolve(projectPath, ".workflows");
          await Bun.mkdir(workflowsDir, { recursive: true });

          // Create default workflow
          if (detectionResult.framework !== "unknown") {
            const workflowEngine = new WorkflowEngine(config as BuildConfig);
            const workflowContent = await workflowEngine.suggestWorkflow(
              detectionResult.framework,
              detectionResult.language
            );

            const workflowPath = resolve(workflowsDir, "default.yml");
            await Bun.write(workflowPath, workflowContent);
            consola.success(`Default workflow created at ${workflowPath}`);
          }

          consola.info("Project initialized successfully!");
          consola.info("Run `solo-build run` to build your project");
        } catch (error) {
          consola.error("Failed to initialize project:", error);
          process.exit(1);
        }
      },
    }),

    run: defineCommand({
      meta: {
        name: "run",
        description: "Run the build process",
      },
      args: {
        config: {
          type: "string",
          description: "Path to config file",
          default: "solo-build.config.js",
        },
        workflow: {
          type: "string",
          description: "Workflow to run",
          default: "default",
        },
      },
      async run({ args }) {
        consola.start("Starting build process...");

        try {
          // Load configuration
          let configPath = args.config;

          // Handle both --config=path and --config path formats
          if (Array.isArray(configPath)) {
            configPath = configPath[0];
          } else if (typeof configPath !== "string") {
            configPath = String(configPath);
          }

          // Resolve config path
          const resolvedConfigPath = resolve(process.cwd(), configPath);
          consola.debug(`Loading config from: ${resolvedConfigPath}`);

          // Check if config file exists
          try {
            await readFile(resolvedConfigPath, "utf8");
          } catch (err) {
            consola.warn(
              `Config file not found at ${resolvedConfigPath}, using defaults`
            );
          }

          // Load configuration
          const { config: userConfig } = await loadConfig({
            name: "solo-build",
            configFile: configPath,
            defaults: defaultConfig,
          });

          if (!userConfig) {
            throw new Error(`Failed to load configuration from ${configPath}`);
          }

          const config = userConfig as BuildConfig;

          // Run workflow if specified
          if (args.workflow && args.workflow !== "default") {
            const workflowEngine = new WorkflowEngine(config);
            await workflowEngine.loadWorkflows();

            const workflowName =
              typeof args.workflow === "string" ? args.workflow : "default";
            consola.info(`Running workflow: ${workflowName}`);
            await workflowEngine.triggerEvent({
              name: "workflow_dispatch",
              payload: {
                workflow: workflowName,
              },
            });
          } else {
            // Run build directly
            consola.info("Running build...");
            const result = await build(config);

            if (result.success) {
              consola.success(`Build completed in ${result.duration}ms`);
              consola.info(`Generated ${result.files?.length || 0} files`);

              if (result.analysis) {
                consola.info(
                  `Architecture score: ${result.analysis.score}/100`
                );
              }
            } else {
              consola.error(`Build failed: ${result.error}`);
              process.exit(1);
            }
          }
        } catch (error) {
          consola.error("Build failed:", error);
          process.exit(1);
        }
      },
    }),

    analyze: defineCommand({
      meta: {
        name: "analyze",
        description: "Analyze code architecture and generate reports",
      },
      args: {
        config: {
          type: "string",
          description: "Path to config file",
          default: "solo-build.config.js",
        },
        format: {
          type: "string",
          description:
            "Report formats to generate (comma-separated: html,json,markdown,all)",
          default: "all",
        },
        "report-type": {
          type: "string",
          description:
            "Types of reports to generate (comma-separated: complexity,issues,dependencies,performance,all)",
          default: "all",
        },
        "output-dir": {
          type: "string",
          description: "Directory to output reports",
          default: "reports",
        },
        visualizations: {
          type: "boolean",
          description: "Whether to include visualizations in reports",
          default: true,
        },
      },
      async run({ args }) {
        consola.start("Starting code analysis...");

        try {
          // Load configuration
          const { config: userConfig } = await loadConfig({
            name: "solo-build",
            configFile: ensureString(args.config),
            defaults: defaultConfig,
          });

          const config = userConfig as BuildConfig;

          // Add reporting configuration from CLI args
          if (!config.reports) {
            config.reports = {};
          }

          // Parse formats
          if (args.format !== "all" && typeof args.format === "string") {
            const formatValues = args.format
              .split(",")
              .map((f: string) => f.trim())
              .filter((f: string) => ["html", "json", "markdown"].includes(f));

            config.reports.formats = formatValues as (
              | "json"
              | "html"
              | "markdown"
            )[];
          } else {
            config.reports.formats = ["html", "json", "markdown"];
          }

          // Parse report types
          if (
            args["report-type"] !== "all" &&
            typeof args["report-type"] === "string"
          ) {
            const typeValues = args["report-type"]
              .split(",")
              .map((t: string) => t.trim())
              .filter((t: string) =>
                [
                  "complexity",
                  "issues",
                  "dependencies",
                  "performance",
                ].includes(t)
              );

            config.reports.types = typeValues as (
              | "complexity"
              | "issues"
              | "dependencies"
              | "performance"
            )[];
          } else {
            config.reports.types = [
              "complexity",
              "issues",
              "dependencies",
              "performance",
            ];
          }

          // Set output directory
          if (args["output-dir"] && typeof args["output-dir"] === "string") {
            config.reports.outputDir = args["output-dir"];
          }

          // Set visualizations
          if (typeof args.visualizations === "boolean") {
            config.reports.includeVisualizations = args.visualizations;
          }

          // Ensure AI is enabled
          if (!config.ai) {
            config.ai = {
              enabled: true,
              optimizationMode: "suggestion",
              analysisDepth: "detailed",
            };
          } else {
            config.ai.enabled = true;
          }

          // Run build with analysis
          consola.info("Analyzing code architecture...");
          const result = await build(config);

          if (result.success) {
            consola.success(`Analysis completed in ${result.duration}ms`);

            if (result.reports && result.reports.length > 0) {
              consola.success(
                `Generated ${result.reports.length} reports in ${
                  config.reports.outputDir || "reports"
                } directory`
              );

              // Group reports by type
              const reportsByType = result.reports.reduce(
                (groups: Record<string, any[]>, report: any) => {
                  const type = report.name.split("-")[0];
                  if (!groups[type]) groups[type] = [];
                  groups[type].push(report);
                  return groups;
                },
                {}
              );

              // List reports by type
              Object.entries(reportsByType).forEach(([type, reports]) => {
                consola.info(`${type} reports (${(reports as any[]).length}):`);
                (reports as any[]).forEach((report) => {
                  consola.info(`  - ${report.name}.${report.format}`);
                });
              });

              // Show path to summary report
              const summaryReport = result.reports.find(
                (r: any) => r.name === "build-summary" && r.format === "html"
              );
              if (summaryReport) {
                consola.info(
                  `\nSummary report: ${path.join(
                    config.projectRoot,
                    config.reports.outputDir || "reports",
                    `build-summary.html`
                  )}`
                );
                consola.info(
                  "You can open this file in a browser to view the full report"
                );
              }
            }

            if (result.analysis) {
              consola.info(`Architecture score: ${result.analysis.score}/100`);

              // Show high importance insights
              if (
                result.analysis.insights &&
                result.analysis.insights.length > 0
              ) {
                const highImportanceInsights = result.analysis.insights.filter(
                  (insight) => insight.importance === "high"
                );

                if (highImportanceInsights.length > 0) {
                  consola.info("Key insights:");
                  highImportanceInsights.forEach((insight) => {
                    consola.info(`- ${insight.description}`);
                  });
                }
              }
            }
          } else {
            consola.error(`Analysis failed: ${result.error}`);
            process.exit(1);
          }
        } catch (error) {
          consola.error("Analysis failed with error:", error);
          process.exit(1);
        }
      },
    }),

    workflow: defineCommand({
      meta: {
        name: "workflow",
        description: "Manage workflows",
      },
      subCommands: {
        list: defineCommand({
          meta: {
            name: "list",
            description: "List available workflows",
          },
          async run() {
            try {
              const { config: userConfig } = await loadConfig({
                name: "solo-build",
                defaults: defaultConfig,
              });

              const config = userConfig as BuildConfig;
              const workflowEngine = new WorkflowEngine(config);
              await workflowEngine.loadWorkflows();

              // Display workflows (this would need to be implemented in WorkflowEngine)
              consola.info("Available workflows:");
              // This would need to be implemented
            } catch (error) {
              consola.error("Failed to list workflows:", error);
              process.exit(1);
            }
          },
        }),

        create: defineCommand({
          meta: {
            name: "create",
            description: "Create a new workflow",
          },
          args: {
            name: {
              type: "string",
              description: "Workflow name",
              required: true,
            },
          },
          async run({ args }) {
            try {
              const { config: userConfig } = await loadConfig({
                name: "solo-build",
                defaults: defaultConfig,
              });

              const config = userConfig as BuildConfig;

              // Detect framework for better workflow suggestion
              const detector = new FrameworkDetector(config.projectRoot);
              const detectionResult = await detector.detect();

              // Create workflow engine
              const workflowEngine = new WorkflowEngine(config);

              // Generate workflow content
              const workflowContent = await workflowEngine.suggestWorkflow(
                detectionResult.framework,
                detectionResult.language
              );

              // Save workflow
              await workflowEngine.createWorkflow(
                ensureString(args.name),
                JSON.parse(workflowContent)
              );

              consola.success(
                `Workflow '${ensureString(args.name)}' created successfully`
              );
            } catch (error) {
              consola.error("Failed to create workflow:", error);
              process.exit(1);
            }
          },
        }),
      },

      // Default action when no subcommand is provided
      async run() {
        consola.info("Use one of the subcommands: list, create");
      },
    }),

    report: defineCommand({
      meta: {
        name: "report",
        description: "Manage and view generated reports",
      },
      subCommands: {
        list: defineCommand({
          meta: {
            name: "list",
            description: "List all generated reports",
          },
          args: {
            dir: {
              type: "string",
              description: "Reports directory",
              default: "reports",
            },
          },
          async run({ args }) {
            try {
              const reportsDir = path.resolve(
                process.cwd(),
                args.dir as string
              );

              if (!fs.existsSync(reportsDir)) {
                consola.error(`Reports directory ${reportsDir} does not exist`);
                process.exit(1);
              }

              const files = await fs.promises.readdir(reportsDir);
              const reportFiles = files.filter((f) =>
                /\.(html|json|markdown|md)$/.test(f)
              );

              if (reportFiles.length === 0) {
                consola.info("No reports found");
                return;
              }

              consola.info(`Found ${reportFiles.length} reports:`);

              // Group by type
              const reportsByType = reportFiles.reduce(
                (groups: Record<string, string[]>, file: string) => {
                  const match = file.match(/^([^-]+)/);
                  const type = match ? match[1] : "other";
                  if (!groups[type]) groups[type] = [];
                  groups[type].push(file);
                  return groups;
                },
                {}
              );

              Object.entries(reportsByType).forEach(([type, files]) => {
                consola.info(`${type} reports:`);
                files.forEach((file) => {
                  consola.info(`  - ${file}`);
                });
              });
            } catch (error) {
              consola.error("Error listing reports:", error);
              process.exit(1);
            }
          },
        }),

        open: defineCommand({
          meta: {
            name: "open",
            description: "Open a report in the browser",
          },
          args: {
            report: {
              type: "string",
              description: "Report to open (default: build-summary.html)",
              default: "build-summary.html",
            },
            dir: {
              type: "string",
              description: "Reports directory",
              default: "reports",
            },
          },
          async run({ args }) {
            try {
              const reportsDir = path.resolve(
                process.cwd(),
                args.dir as string
              );
              const reportPath = path.join(reportsDir, args.report as string);

              if (!fs.existsSync(reportPath)) {
                consola.error(`Report ${reportPath} does not exist`);
                process.exit(1);
              }

              consola.info(`Opening ${reportPath} in browser...`);

              // Use open package to open the file in the default browser
              const open = require("open");
              await open(reportPath);

              consola.success("Report opened in browser");
            } catch (error) {
              consola.error("Error opening report:", error);
              process.exit(1);
            }
          },
        }),
      },
      async run({ args }) {
        // Show help when no subcommand is provided
        consola.info("Use one of these subcommands:");
        consola.info("  solo-build report list - List all generated reports");
        consola.info("  solo-build report open - Open a report in the browser");
      },
    }),
  },

  // Default action when no subcommand is provided
  async run() {
    consola.info("Use one of the subcommands: init, run, analyze, workflow");
  },
});

runMain(main);
