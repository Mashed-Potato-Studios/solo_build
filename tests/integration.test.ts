// tests/integration.test.ts
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import * as fs from 'fs/promises';
import * as path from 'path';
import { build } from '../src/index';
import { BuildConfig } from '../types';

describe('Build System Integration', () => {
  const testDir = path.join(__dirname, 'integration-test');
  const srcDir = path.join(testDir, 'src');
  const outDir = path.join(testDir, 'dist');
  
  // Create test config
  const config = {
    projectRoot: testDir,
    sourceDir: 'src',
    outDir: 'dist',
    target: 'es2020' as const,
    module: 'commonjs' as const,
    minify: true,
    sourceMaps: true,
    include: ['**/*.ts'],
    exclude: [],
    tasks: {
      'pre-build': {
        type: 'command' as const,
        command: 'echo "Pre-build task running"'
      },
      'post-build': {
        type: 'command' as const,
        command: 'echo "Post-build task running"'
      }
    },
    analyze: {
      complexity: true,
      dependencies: true,
      duplication: false,
      security: true
    },
    ai: {
      enabled: false,
      optimizationMode: 'suggestion' as const,
      analysisDepth: 'basic' as const
    }
  } as BuildConfig;
  
  beforeEach(async () => {
    // Create test directory structure
    await fs.mkdir(srcDir, { recursive: true });
    
    // Create test files
    await fs.writeFile(path.join(srcDir, 'index.ts'), `
      import { greet } from './utils';
      
      function main() {
        console.log(greet('World'));
      }
      
      main();
    `);
    
    await fs.writeFile(path.join(srcDir, 'utils.ts'), `
      export function greet(name: string): string {
        return \`Hello, \${name}!\`;
      }
    `);
  });
  
  afterEach(async () => {
    // Clean up test files
    await fs.rm(testDir, { recursive: true, force: true });
  });
  
  it('should build a project end-to-end', async () => {
    const result = await build(config);
    
    // Check build result
    expect(result.success).toBe(true);
    expect(result.duration).toBeGreaterThan(0);
    
    // Check analysis results
    expect(result.analysis).toBeDefined();
    expect(result.analysis?.complexity).toBeDefined();
    expect(result.analysis?.dependencies).toBeDefined();
    expect(result.analysis?.issues).toBeDefined();
    
    // Check reports
    expect(result.reports).toBeDefined();
    expect(result.reports?.length).toBeGreaterThan(0);
  });
});
