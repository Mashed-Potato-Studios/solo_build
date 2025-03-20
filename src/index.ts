// src/index.ts
import { BuildConfig, BuildResult, AnalysisResult, AIAnalysisResult } from '../types';
import TaskRunner from './task-runner/index';
import { Parser } from '../packages/parser';
import { OxcCodeParser } from '../packages/oxc-parser';
import { Analyzer } from '../packages/analyser';
import { Transformer } from './transformer';
import { Generator } from './generator';
import { AIEngine } from './ai-engine';
import { Reporter } from './reporter';
import { WorkflowEngine } from './workflow';
import consola from 'consola';

export async function build(config: BuildConfig): Promise<BuildResult> {
  const startTime = Date.now();
  
  try {
    // Initialize components
    const taskRunner = new TaskRunner(config);
    const parser = config.useOxc ? new OxcCodeParser(config) : new Parser(config);
    const analyzer = new Analyzer(config);
    const transformer = new Transformer(config);
    const generator = new Generator(config);
    const aiEngine = new AIEngine(config.ai);
    const reporter = new Reporter(config);
    const workflowEngine = new WorkflowEngine(config);
    
    // Load workflows
    await workflowEngine.loadWorkflows();
    
    // Run pre-build tasks
    await taskRunner.runTasks('pre-build');
    
    // Trigger build start workflow event
    await workflowEngine.triggerEvent({ name: 'build.start', payload: { config } });
    
    // Parse source files
    consola.info('Parsing source files...');
    const parseResult = await parser.parseFiles();
    
    // Analyze code
    consola.info('Analyzing code...');
    const analysisResult: AnalysisResult = await analyzer.analyze(parseResult.ast);
    
    // Run AI analysis if enabled
    let aiAnalysis: AIAnalysisResult | null = null;
    if (config.ai?.enabled) {
      consola.info('Running AI analysis...');
      aiAnalysis = await aiEngine.analyzeArchitecture(parseResult.ast, analysisResult);
      
      // Apply AI suggestions if automatic mode is enabled
      if (config.ai.optimizationMode === 'automatic') {
        consola.info('Applying AI optimizations...');
        await transformer.applyOptimizations(aiAnalysis.optimizations);
      }
    }
    
    // Transform code
    consola.info('Transforming code...');
    const transformResult = await transformer.transform(parseResult.ast);
    
    // Generate output
    consola.info('Generating output...');
    const generateResult = await generator.generate(transformResult);
    
    // Trigger build complete workflow event
    await workflowEngine.triggerEvent({ 
      name: 'build.complete', 
      payload: { 
        success: true,
        stats: generateResult.stats,
        duration: Date.now() - startTime
      } 
    });
    
    // Run post-build tasks
    await taskRunner.runTasks('post-build');
    
    // Generate reports
    const reports = await reporter.generateReports(analysisResult);
    
    return {
      success: true,
      duration: Date.now() - startTime,
      files: generateResult.files,
      stats: generateResult.stats,
      analysis: analysisResult,
      reports
    };
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    consola.error(`Build failed: ${error.message}`);
    
    try {
      // Trigger build error workflow event
      const workflowEngine = new WorkflowEngine(config);
      await workflowEngine.triggerEvent({ 
        name: 'build.error', 
        payload: { 
          error: error.message,
          duration: Date.now() - startTime
        } 
      });
    } catch (workflowError) {
      consola.warn('Failed to trigger workflow event:', workflowError);
    }
    
    return {
      success: false,
      duration: Date.now() - startTime,
      error: error.message
    };
  }
}