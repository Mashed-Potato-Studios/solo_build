// tests/parser.test.ts
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import * as fs from 'fs/promises';
import * as path from 'path';
import { Parser } from '../packages/parser';
import { BuildConfig } from '../types';

describe('Parser', () => {
  const testDir = path.join(__dirname, 'fixtures');
  const testFile = path.join(testDir, 'test.ts');
  
  // Mock config
  const config = {
    projectRoot: testDir,
    sourceDir: '.',
    outDir: 'dist',
    target: 'es2020' as const,
    module: 'commonjs' as const,
    minify: true,
    sourceMaps: true,
    include: ['**/*.ts'],
    exclude: [],
    tasks: {},
    analyze: {
      complexity: true,
      dependencies: true,
      duplication: false,
      security: true
    }
  } as BuildConfig;
  
  beforeEach(async () => {
    // Create test directory and file
    await fs.mkdir(testDir, { recursive: true });
    await fs.writeFile(testFile, `
      // Test file
      export function add(a: number, b: number): number {
        return a + b;
      }
    `);
  });
  
  afterEach(async () => {
    // Clean up test files
    await fs.rm(testDir, { recursive: true, force: true });
  });
  
  it('should parse TypeScript files correctly', async () => {
    const parser = new Parser(config);
    const result = await parser.parseFiles();
    
    // Check that files were parsed
    expect(result.files.length).toBeGreaterThan(0);
    expect(result.files[0].path).toContain('test.ts');
    
    // Check that AST was generated
    expect(Object.keys(result.ast).length).toBeGreaterThan(0);
    
    // Check that no errors occurred
    expect(Object.keys(result.errors).length).toBe(0);
  });
});
