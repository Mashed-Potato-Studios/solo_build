// src/index.ts
import {
  BuildConfig,
  BuildResult,
  AnalysisResult,
  AIAnalysisResult,
} from "../types";
import TaskRunner from "./task-runner/index";
import { Parser } from "../packages/parser";
import { OxcCodeParser } from "../packages/oxc-parser";
import { Analyzer } from "../packages/analyser";
import { Transformer } from "./transformer";
import { Generator } from "./generator";
import { AIEngine } from "./ai-engine";
import { Reporter } from "./reporter";
import { WorkflowEngine } from "./workflow";
import consola from "consola";
import { ParseResult } from "../types";

// Custom interface extending ParseResult to include totalSize
interface ExtendedParseResult extends ParseResult {
  totalSize?: number;
}

export async function build(config: BuildConfig): Promise<BuildResult> {
  const startTime = Date.now();

  try {
    // Initialize components
    const taskRunner = new TaskRunner(config);
    const parser = config.useOxc
      ? new OxcCodeParser(config)
      : new Parser(config);
    const analyzer = new Analyzer(config);
    const transformer = new Transformer(config);
    const generator = new Generator(config);
    const aiEngine = new AIEngine(config.ai);
    const reporter = new Reporter(config);
    const workflowEngine = new WorkflowEngine(config);

    // Load workflows
    await workflowEngine.loadWorkflows();

    // Run pre-build tasks
    await taskRunner.runTasks("pre-build");

    // Trigger build start workflow event
    await workflowEngine.triggerEvent({
      name: "build.start",
      payload: { config },
    });

    // Parse source files
    consola.info("Parsing source files...");
    const parseResult = (await parser.parseFiles()) as ExtendedParseResult;
    const ast = parseResult.ast;

    // Analyze code
    consola.info("Analyzing code...");
    const analysisResult = await analyzer.analyze(ast);

    // Run AI analysis if enabled
    let aiAnalysis: AIAnalysisResult | null = null;
    if (config.ai?.enabled) {
      consola.info("Running AI analysis...");
      aiAnalysis = await aiEngine.analyzeArchitecture(ast, analysisResult);

      // Merge AI insights into analysis result
      if (aiAnalysis) {
        // Add AI insights to analysis result
        analysisResult.insights = [
          ...analysisResult.insights,
          ...aiAnalysis.insights.map((insight) => ({
            importance: insight.importance,
            description: insight.description,
          })),
        ];

        // Add AI architecture suggestions
        analysisResult.architecture.suggestions = [
          ...analysisResult.architecture.suggestions,
          ...aiAnalysis.architecture.suggestions,
        ];
      }
    }

    // Transform code
    consola.info("Transforming code...");
    const transformedCode = await transformer.transform(parseResult);

    // Generate output files
    consola.info("Generating output files...");
    const generateResult = await generator.generate(transformedCode);

    // Run post-build tasks
    await taskRunner.runTasks("post-build");

    // Calculate build time
    const duration = Date.now() - startTime;

    // Check if reports are enabled
    let reportResult: any[] = [];
    if (shouldGenerateReports(config)) {
      // Apply report configuration
      configureReporter(reporter, config);

      // Generate reports
      consola.info("Generating reports...");
      reportResult = await reporter.generateReports(analysisResult, {
        duration,
        stats: {
          files: parseResult.files?.length || 0,
          totalSize: parseResult.totalSize || 0,
          outputSize: generator.getOutputSize() || 0,
          compressionRatio: parseResult.totalSize
            ? generator.getOutputSize() / parseResult.totalSize
            : 1,
        },
      });
    }

    // Return the result
    return {
      success: true,
      duration,
      files: generator.getFiles(),
      stats: {
        inputSize: parseResult.totalSize,
        outputSize: generator.getOutputSize(),
        compressionRatio: parseResult.totalSize
          ? generator.getOutputSize() / parseResult.totalSize
          : 1,
      },
      analysis: analysisResult,
      reports: reportResult,
    };
  } catch (err: unknown) {
    consola.error("Build failed:", err);
    return {
      success: false,
      duration: Date.now() - startTime,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

// Helper function to determine if reports should be generated
function shouldGenerateReports(config: BuildConfig): boolean {
  // Reports are enabled by default
  if (!config.reports) {
    return true;
  }

  // If reports.enabled is explicitly set to false, disable reports
  if (config.reports.enabled === false) {
    return false;
  }

  return true;
}

// Helper function to configure the reporter based on config
function configureReporter(reporter: Reporter, config: BuildConfig): void {
  if (!config.reports) {
    return;
  }

  // Set the reporter's config
  reporter.configure({
    formats: config.reports.formats || ["html", "json", "markdown"],
    types: config.reports.types || [
      "complexity",
      "issues",
      "dependencies",
      "performance",
    ],
    outputDir: config.reports.outputDir || "reports",
    includeVisualizations: config.reports.includeVisualizations !== false,
  });
}
