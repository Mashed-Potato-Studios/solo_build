// packages/analyser/index.ts
import { BuildConfig, AnalysisResult, Issue } from './types';
import traverse from '@babel/traverse';
import * as t from '@babel/types';

export class Analyzer {
  private config: BuildConfig;
  
  constructor(config: BuildConfig) {
    this.config = config;
  }
  
  async analyze(ast: Record<string, any>): Promise<AnalysisResult> {
    const complexity: Record<string, number> = {};
    const dependencies: Record<string, string[]> = {};
    const issues: Record<string, Issue[]> = {};
    const metrics: Record<string, any> = {};
    
    // Analyze each file
    for (const filePath in ast) {
      const fileAst = ast[filePath];
      
      // Calculate complexity
      complexity[filePath] = this.calculateComplexity(fileAst);
      
      // Extract dependencies
      dependencies[filePath] = this.extractDependencies(fileAst);
      
      // Find issues
      issues[filePath] = this.findIssues(fileAst, filePath);
      
      // Collect metrics
      metrics[filePath] = this.collectMetrics(fileAst);
    }
    
    // Calculate overall score based on complexity and issues
    const totalComplexity = Object.values(complexity).reduce((sum, value) => sum + value, 0);
    const totalIssues = Object.values(issues).reduce((sum, fileIssues) => sum + fileIssues.length, 0);
    const score = this.calculateScore(totalComplexity, totalIssues, Object.keys(ast).length);
    
    // Generate insights based on analysis
    const insights = this.generateInsights(complexity, dependencies, issues);
    
    // Generate architecture information
    const architecture = this.generateArchitecture(dependencies);
    
    return {
      complexity,
      dependencies,
      issues,
      metrics,
      score,
      insights,
      architecture
    };
  }
  
  private calculateComplexity(ast: any): number {
    let complexity = 1; // Base complexity
    
    traverse(ast, {
      // Count logical paths
      IfStatement() { complexity++; },
      SwitchCase() { complexity++; },
      ConditionalExpression() { complexity++; },
      LogicalExpression() { complexity++; },
      ForStatement() { complexity++; },
      WhileStatement() { complexity++; },
      DoWhileStatement() { complexity++; },
      TryStatement() { complexity++; },
      CatchClause() { complexity++; }
    });
    
    return complexity;
  }
  
  private extractDependencies(ast: any): string[] {
    const dependencies: string[] = [];
    
    traverse(ast, {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        if (typeof source === 'string' && !dependencies.includes(source)) {
          dependencies.push(source);
        }
      },
      
      CallExpression(path) {
        // Check for require calls
        if (t.isIdentifier(path.node.callee, { name: 'require' }) && 
            path.node.arguments.length > 0 && 
            t.isStringLiteral(path.node.arguments[0])) {
          const source = path.node.arguments[0].value;
          if (!dependencies.includes(source)) {
            dependencies.push(source);
          }
        }
      }
    });
    
    return dependencies;
  }
  
  private findIssues(ast: any, filePath: string): Issue[] {
    const issues: Issue[] = [];
    
    traverse(ast, {
      // Example: Find unused variables
      VariableDeclarator(path) {
        if (t.isIdentifier(path.node.id)) {
          const binding = path.scope.getBinding(path.node.id.name);
          
          if (binding && binding.referenced === false) {
            issues.push({
              type: 'warning',
              message: `Unused variable '${path.node.id.name}'`,
              file: filePath,
              line: path.node.loc?.start?.line ?? 0,
              column: path.node.loc?.start?.column ?? 0,
              code: 'unused-var'
            });
          }
        }
      },
      
      // Example: Find console.log statements
      CallExpression(path) {
        if (t.isMemberExpression(path.node.callee) && 
            t.isIdentifier(path.node.callee.object, { name: 'console' }) &&
            t.isIdentifier(path.node.callee.property, { name: 'log' })) {
          issues.push({
            type: 'info',
            message: 'Console statement found',
            file: filePath,
            line: path.node.loc?.start?.line ?? 0,
            column: path.node.loc?.start?.column ?? 0,
            code: 'no-console'
          });
        }
      }
    });
    
    return issues;
  }
  
  private collectMetrics(ast: any): Record<string, any> {
    const metrics = {
      functions: 0,
      classes: 0,
      imports: 0,
      exports: 0
    };
    
    traverse(ast, {
      Function() { metrics.functions++; },
      ClassDeclaration() { metrics.classes++; },
      ImportDeclaration() { metrics.imports++; },
      ExportDeclaration() { metrics.exports++; }
    });
    
    return metrics;
  }
  
  private calculateScore(complexity: number, issues: number, fileCount: number): number {
    // Simple scoring algorithm
    const baseScore = 100;
    const complexityPenalty = Math.min(40, complexity / (fileCount * 5));
    const issuesPenalty = Math.min(30, issues * 2);
    
    return Math.max(0, Math.round(baseScore - complexityPenalty - issuesPenalty));
  }
  
  private generateInsights(
    complexity: Record<string, number>,
    dependencies: Record<string, string[]>,
    issues: Record<string, Issue[]>
  ): Array<{ importance: string; description: string }> {
    const insights: Array<{ importance: string; description: string }> = [];
    
    // Find complex files
    const complexFiles = Object.entries(complexity)
      .filter(([_, value]) => value > 15)
      .sort(([_, a], [__, b]) => b - a)
      .slice(0, 3);
    
    if (complexFiles.length > 0) {
      complexFiles.forEach(([file, value]) => {
        insights.push({
          importance: value > 25 ? 'high' : 'medium',
          description: `File ${file} has high complexity (${value}). Consider refactoring.`
        });
      });
    }
    
    // Find files with many dependencies
    const highDependencyFiles = Object.entries(dependencies)
      .filter(([_, deps]) => deps.length > 10)
      .sort(([_, a], [__, b]) => b.length - a.length)
      .slice(0, 3);
    
    if (highDependencyFiles.length > 0) {
      highDependencyFiles.forEach(([file, deps]) => {
        insights.push({
          importance: deps.length > 15 ? 'high' : 'medium',
          description: `File ${file} has many dependencies (${deps.length}). Consider reducing coupling.`
        });
      });
    }
    
    // Summarize issues
    const totalIssues = Object.values(issues).reduce((sum, fileIssues) => sum + fileIssues.length, 0);
    if (totalIssues > 0) {
      insights.push({
        importance: totalIssues > 10 ? 'high' : 'medium',
        description: `Found ${totalIssues} issues across the codebase. Run 'analyze' command for details.`
      });
    }
    
    return insights;
  }
  
  private generateArchitecture(dependencies: Record<string, string[]>): {
    components: string[];
    relationships: Record<string, string[]>;
    diagram: string;
    suggestions: string[];
  } {
    // Extract components (modules/directories)
    const components = new Set<string>();
    const relationships: Record<string, string[]> = {};
    
    // Extract components and relationships
    Object.entries(dependencies).forEach(([file, deps]) => {
      const component = this.getComponentFromPath(file);
      components.add(component);
      
      if (!relationships[component]) {
        relationships[component] = [];
      }
      
      deps.forEach(dep => {
        const depComponent = this.getComponentFromPath(dep);
        if (depComponent && depComponent !== component && !relationships[component].includes(depComponent)) {
          relationships[component].push(depComponent);
        }
      });
    });
    
    // Generate simple ASCII diagram
    const diagram = this.generateDiagram(Array.from(components), relationships);
    
    // Generate architecture suggestions
    const suggestions = this.generateArchitectureSuggestions(relationships);
    
    return {
      components: Array.from(components),
      relationships,
      diagram,
      suggestions
    };
  }
  
  private getComponentFromPath(path: string): string {
    // Extract component/module name from path
    // This is a simple implementation
    const parts = path.split('/');
    return parts.length > 1 ? parts[0] : 'root';
  }
  
  private generateDiagram(components: string[], relationships: Record<string, string[]>): string {
    // Simple ASCII diagram
    let diagram = 'Architecture Diagram:\n';
    
    components.forEach(component => {
      diagram += `[${component}]\n`;
      if (relationships[component]) {
        relationships[component].forEach(dep => {
          diagram += `  └─→ [${dep}]\n`;
        });
      }
    });
    
    return diagram;
  }
  
  private generateArchitectureSuggestions(relationships: Record<string, string[]>): string[] {
    const suggestions: string[] = [];
    
    // Check for circular dependencies
    const circularDeps = this.findCircularDependencies(relationships);
    if (circularDeps.length > 0) {
      suggestions.push(`Found circular dependencies: ${circularDeps.join(' → ')}. Consider refactoring.`);
    }
    
    // Check for highly coupled components
    const highlyCoupled = Object.entries(relationships)
      .filter(([_, deps]) => deps.length > 5)
      .map(([component, _]) => component);
    
    if (highlyCoupled.length > 0) {
      suggestions.push(`Components with high coupling: ${highlyCoupled.join(', ')}. Consider reducing dependencies.`);
    }
    
    return suggestions;
  }
  
  private findCircularDependencies(relationships: Record<string, string[]>): string[] {
    // Simple circular dependency detection
    // This is a basic implementation
    for (const [component, deps] of Object.entries(relationships)) {
      for (const dep of deps) {
        if (relationships[dep] && relationships[dep].includes(component)) {
          return [component, dep, component];
        }
      }
    }
    
    return [];
  }
}