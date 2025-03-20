// tests/analyzer.test.ts
import { describe, it, expect, jest } from '@jest/globals';
import { Analyzer } from '../packages/analyser';
import { BuildConfig, ParseResult, ASTNode } from '../types';

// Mock Babel traverse
jest.mock('@babel/traverse', () => {
  return {
    __esModule: true,
    default: jest.fn((ast, visitors: Record<string, any>) => {
      // Simple mock implementation that just calls the visitor methods
      if (typeof visitors.IfStatement === 'function') visitors.IfStatement();
      if (typeof visitors.ImportDeclaration === 'function') {
        visitors.ImportDeclaration({
          node: {
            source: {
              value: './utils'
            }
          }
        });
      }
      if (typeof visitors.CallExpression === 'function') {
        visitors.CallExpression({
          node: {
            callee: {
              name: 'console',
              object: { name: 'console' },
              property: { name: 'log' }
            }
          },
          scope: { getAllBindings: () => ({}) }
        });
      }
      return null;
    })
  };
});

describe('Analyzer', () => {
  // Mock config
  const config = {
    projectRoot: '/test',
    sourceDir: 'src',
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
  
  // Mock parse result
  const mockAst: ASTNode = {
    type: 'Program',
    start: 0,
    end: 100,
    loc: {
      start: { line: 1, column: 0 },
      end: { line: 5, column: 1 }
    },
    body: [
      {
        type: 'FunctionDeclaration',
        start: 0,
        end: 50,
        loc: {
          start: { line: 1, column: 0 },
          end: { line: 3, column: 1 }
        },
        id: {
          type: 'Identifier',
          name: 'testFunction'
        }
      }
    ]
  };
  
  const parseResult: ParseResult = {
    files: [
      {
        path: '/test/src/index.ts',
        content: 'function testFunction() { return true; }',
        ast: mockAst
      }
    ],
    ast: {
      '/test/src/index.ts': mockAst
    },
    errors: {}
  };
  
  it('should analyze code and generate metrics', async () => {
    const analyzer = new Analyzer(config);
    const result = await analyzer.analyze(parseResult);
    
    // Check that analysis result has expected properties
    expect(result).toHaveProperty('complexity');
    expect(result).toHaveProperty('dependencies');
    expect(result).toHaveProperty('issues');
    expect(result).toHaveProperty('metrics');
    expect(result).toHaveProperty('score');
    
    // Check complexity metrics
    expect(Object.keys(result.complexity).length).toBeGreaterThan(0);
  });
});
