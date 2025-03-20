// src/config/index.ts
import { resolve } from 'pathe';
import { loadConfig } from 'c12';
import { defu } from 'defu';
import { BuildConfig } from '../../types';
import consola from 'consola';

/// <reference path="../../types/bun.d.ts" />

// Default configuration
export const defaultConfig: Partial<BuildConfig> = {
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

/**
 * Load configuration from file and merge with defaults
 */
export async function loadBuildConfig(configPath?: string): Promise<BuildConfig> {
  try {
    const { config: userConfig } = await loadConfig({
      name: 'solo-build',
      configFile: configPath,
      defaults: defaultConfig
    });
    
    // Merge with defaults
    const config = defu(userConfig, defaultConfig) as BuildConfig;
    
    // Ensure projectRoot is absolute
    if (!config.projectRoot || !config.projectRoot.startsWith('/')) {
      config.projectRoot = resolve(process.cwd(), config.projectRoot || '.');
    }
    
    // Ensure source and output directories are relative to project root
    config.sourceDir = resolve(config.projectRoot, config.sourceDir);
    config.outDir = resolve(config.projectRoot, config.outDir);
    
    return config;
  } catch (error: unknown) {
    consola.error('Error loading configuration:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load configuration: ${errorMessage}`);
  }
}

/**
 * Create a new configuration file
 */
export async function createConfigFile(configPath: string, config: Partial<BuildConfig>): Promise<void> {
  try {
    const fullConfig = defu(config, defaultConfig);
    const configContent = `// solo-build.config.js
module.exports = ${JSON.stringify(fullConfig, null, 2)}
`;
    
    await Bun.write(configPath, configContent);
    consola.success(`Configuration created at ${configPath}`);
  } catch (error: unknown) {
    consola.error('Error creating configuration file:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create configuration file: ${errorMessage}`);
  }
}
