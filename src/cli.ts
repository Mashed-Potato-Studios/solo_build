#!/usr/bin/env node
// src/cli.ts
/// <reference path="../types/bun.d.ts" />
import { defineCommand, runMain } from 'citty';
import consola from 'consola';
import { resolve } from 'pathe';
import { readFile } from 'fs/promises';
import { loadConfig } from 'c12';
import { defu } from 'defu';
import { BuildConfig } from '../types';
import { build } from './index';
import { FrameworkDetector } from './framework-detector';
import { WorkflowEngine } from './workflow';
import { version } from '../package.json';

// Helper function to ensure string type
function ensureString(value: string | boolean | string[]): string {
  if (Array.isArray(value)) {
    return value.join(',');
  }
  return String(value);
}

// Default configuration
const defaultConfig: Partial<BuildConfig> = {
  projectRoot: process.cwd(),
  sourceDir: 'src',
  outDir: 'dist',
  target: 'es2020',
  module: 'commonjs',
  minify: true,
  sourceMaps: true,
  include: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  exclude: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/*.test.*', '**/*.spec.*'],
  tasks: {},
  analyze: {
    complexity: true,
    dependencies: true,
    duplication: false,
    security: true
  }
};

// Main command
const main = defineCommand({
  meta: {
    name: 'solo-build',
    version,
    description: 'AI-powered build system with architectural awareness'
  },
  subCommands: {
    init: defineCommand({
      meta: {
        name: 'init',
        description: 'Initialize a new project configuration'
      },
      args: {
        path: {
          type: 'string',
          description: 'Project path',
          default: '.'
        }
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
        const config = defu({
          projectRoot: projectPath,
          sourceDir: detectionResult.framework === 'nextjs' ? 'pages' : 'src',
          // Customize based on detected framework
          include: detectionResult.framework === 'react' ? 
            ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'] : 
            ['**/*.ts', '**/*.js'],
        }, defaultConfig);
        
        // Write configuration file
        const configPath = resolve(projectPath, 'solo-build.config.js');
        const configContent = `// solo-build.config.js
module.exports = ${JSON.stringify(config, null, 2)}
`;
        
        try {
          await Bun.write(configPath, configContent);
          consola.success(`Configuration created at ${configPath}`);
          
          // Create workflow directory
          const workflowsDir = resolve(projectPath, '.workflows');
          await Bun.mkdir(workflowsDir, { recursive: true });
          
          // Create default workflow
          if (detectionResult.framework !== 'unknown') {
            const workflowEngine = new WorkflowEngine(config as BuildConfig);
            const workflowContent = await workflowEngine.suggestWorkflow(
              detectionResult.framework, 
              detectionResult.language
            );
            
            const workflowPath = resolve(workflowsDir, 'default.yml');
            await Bun.write(workflowPath, workflowContent);
            consola.success(`Default workflow created at ${workflowPath}`);
          }
          
          consola.info('Project initialized successfully!');
          consola.info('Run `solo-build run` to build your project');
        } catch (error) {
          consola.error('Failed to initialize project:', error);
          process.exit(1);
        }
      }
    }),
    
    run: defineCommand({
      meta: {
        name: 'run',
        description: 'Run the build process'
      },
      args: {
        config: {
          type: 'string',
          description: 'Path to config file',
          default: 'solo-build.config.js'
        },
        workflow: {
          type: 'string',
          description: 'Workflow to run',
          default: 'default'
        }
      },
      async run({ args }) {
        consola.start('Starting build process...');
        
        try {
          // Load configuration
          let configPath = args.config;
          
          // Handle both --config=path and --config path formats
          if (Array.isArray(configPath)) {
            configPath = configPath[0];
          } else if (typeof configPath !== 'string') {
            configPath = String(configPath);
          }
          
          // Resolve config path
          const resolvedConfigPath = resolve(process.cwd(), configPath);
          consola.debug(`Loading config from: ${resolvedConfigPath}`);
          
          // Check if config file exists
          try {
            await readFile(resolvedConfigPath, 'utf8');
          } catch (err) {
            consola.warn(`Config file not found at ${resolvedConfigPath}, using defaults`);
          }
          
          // Load configuration
          const { config: userConfig } = await loadConfig({
            name: 'solo-build',
            configFile: configPath,
            defaults: defaultConfig
          });
          
          if (!userConfig) {
            throw new Error(`Failed to load configuration from ${configPath}`);
          }
          
          const config = userConfig as BuildConfig;
          
          // Run workflow if specified
          if (args.workflow && args.workflow !== 'default') {
            const workflowEngine = new WorkflowEngine(config);
            await workflowEngine.loadWorkflows();
            
            const workflowName = typeof args.workflow === 'string' ? args.workflow : 'default';
            consola.info(`Running workflow: ${workflowName}`);
            await workflowEngine.triggerEvent({
              name: 'workflow_dispatch',
              payload: {
                workflow: workflowName
              }
            });
          } else {
            // Run build directly
            consola.info('Running build...');
            const result = await build(config);
            
            if (result.success) {
              consola.success(`Build completed in ${result.duration}ms`);
              consola.info(`Generated ${result.files?.length || 0} files`);
              
              if (result.analysis) {
                consola.info(`Architecture score: ${result.analysis.score}/100`);
              }
            } else {
              consola.error(`Build failed: ${result.error}`);
              process.exit(1);
            }
          }
        } catch (error) {
          consola.error('Build failed:', error);
          process.exit(1);
        }
      }
    }),
    
    analyze: defineCommand({
      meta: {
        name: 'analyze',
        description: 'Analyze code architecture'
      },
      args: {
        config: {
          type: 'string',
          description: 'Path to config file',
          default: 'solo-build.config.js'
        }
      },
      async run({ args }) {
        consola.start('Starting code analysis...');
        
        try {
          // Load configuration
          const { config: userConfig } = await loadConfig({
            name: 'solo-build',
            configFile: ensureString(args.config),
            defaults: defaultConfig
          });
          
          const config = userConfig as BuildConfig;
          
          // Ensure AI is enabled
          if (!config.ai) {
            config.ai = {
              enabled: true,
              optimizationMode: 'suggestion',
              analysisDepth: 'detailed'
            };
          } else {
            config.ai.enabled = true;
          }
          
          // Run build with analysis
          consola.info('Analyzing code architecture...');
          const result = await build(config);
          
          if (result.success && result.analysis) {
            consola.success(`Analysis completed in ${result.duration}ms`);
            consola.info(`Architecture score: ${result.analysis.score}/100`);
            
            // Display insights
            if (result.analysis.insights.length > 0) {
              consola.info('Insights:');
              for (const insight of result.analysis.insights) {
                const logger = insight.importance === 'high' ? consola.warn : 
                              insight.importance === 'medium' ? consola.info : consola.debug;
                
                logger(`- ${insight.description}`);
              }
            }
            
            // Display suggestions
            if (result.analysis.architecture.suggestions.length > 0) {
              consola.info('Architecture suggestions:');
              for (const suggestion of result.analysis.architecture.suggestions) {
                consola.info(`- ${suggestion}`);
              }
            }
          } else {
            consola.error(`Analysis failed: ${result.error}`);
            process.exit(1);
          }
        } catch (error) {
          consola.error('Analysis failed:', error);
          process.exit(1);
        }
      }
    }),
    
    workflow: defineCommand({
      meta: {
        name: 'workflow',
        description: 'Manage workflows'
      },
      subCommands: {
        list: defineCommand({
          meta: {
            name: 'list',
            description: 'List available workflows'
          },
          async run() {
            try {
              const { config: userConfig } = await loadConfig({
                name: 'solo-build',
                defaults: defaultConfig
              });
              
              const config = userConfig as BuildConfig;
              const workflowEngine = new WorkflowEngine(config);
              await workflowEngine.loadWorkflows();
              
              // Display workflows (this would need to be implemented in WorkflowEngine)
              consola.info('Available workflows:');
              // This would need to be implemented
            } catch (error) {
              consola.error('Failed to list workflows:', error);
              process.exit(1);
            }
          }
        }),
        
        create: defineCommand({
          meta: {
            name: 'create',
            description: 'Create a new workflow'
          },
          args: {
            name: {
              type: 'string',
              description: 'Workflow name',
              required: true
            }
          },
          async run({ args }) {
            try {
              const { config: userConfig } = await loadConfig({
                name: 'solo-build',
                defaults: defaultConfig
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
              await workflowEngine.createWorkflow(ensureString(args.name), JSON.parse(workflowContent));
              
              consola.success(`Workflow '${ensureString(args.name)}' created successfully`);
            } catch (error) {
              consola.error('Failed to create workflow:', error);
              process.exit(1);
            }
          }
        })
      },
      
      // Default action when no subcommand is provided
      async run() {
        consola.info('Use one of the subcommands: list, create');
      }
    })
  },
  
  // Default action when no subcommand is provided
  async run() {
    consola.info('Use one of the subcommands: init, run, analyze, workflow');
  }
});

runMain(main);
