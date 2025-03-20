// src/reporter/index.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import { BuildConfig, AnalysisResult } from '../../types';
import consola from 'consola';

export interface Report {
  name: string;
  content: string;
  format: 'json' | 'html' | 'markdown' | 'text';
}

export class Reporter {
  private config: BuildConfig;
  
  constructor(config: BuildConfig) {
    this.config = config;
  }
  
  async generateReports(analysis: AnalysisResult): Promise<Report[]> {
    consola.info('Generating reports...');
    
    const reports: Report[] = [];
    
    // Create reports directory if it doesn't exist
    const reportsDir = path.join(this.config.projectRoot, 'reports');
    await fs.mkdir(reportsDir, { recursive: true });
    
    // Generate complexity report
    const complexityReport = this.generateComplexityReport(analysis);
    reports.push(complexityReport);
    
    // Generate issues report
    const issuesReport = this.generateIssuesReport(analysis);
    reports.push(issuesReport);
    
    // Generate dependencies report
    const dependenciesReport = this.generateDependenciesReport(analysis);
    reports.push(dependenciesReport);
    
    // Write reports to files
    for (const report of reports) {
      const reportPath = path.join(reportsDir, `${report.name}.${report.format}`);
      await fs.writeFile(reportPath, report.content, 'utf8');
    }
    
    consola.success(`Generated ${reports.length} reports`);
    
    return reports;
  }
  
  private generateComplexityReport(analysis: AnalysisResult): Report {
    // Generate complexity report
    return {
      name: 'complexity',
      content: JSON.stringify(analysis.complexity, null, 2),
      format: 'json'
    };
  }
  
  private generateIssuesReport(analysis: AnalysisResult): Report {
    // Generate issues report
    return {
      name: 'issues',
      content: JSON.stringify(analysis.issues, null, 2),
      format: 'json'
    };
  }
  
  private generateDependenciesReport(analysis: AnalysisResult): Report {
    // Generate dependencies report
    return {
      name: 'dependencies',
      content: JSON.stringify(analysis.dependencies, null, 2),
      format: 'json'
    };
  }
}
