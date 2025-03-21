// src/types.ts
export interface BuildConfig {
  // Project configuration
  projectRoot: string;
  sourceDir: string;
  outDir: string;

  // Build options
  target:
    | "es5"
    | "es2015"
    | "es2016"
    | "es2017"
    | "es2018"
    | "es2019"
    | "es2020"
    | "es2021"
    | "es2022"
    | "esnext";
  module: "commonjs" | "amd" | "umd" | "systemjs" | "es2015" | "esnext";
  minify: boolean;
  sourceMaps: boolean;

  // Parser options
  useOxc?: boolean; // Whether to use oxc parser instead of Babel

  // Processing options
  include: string[];
  exclude: string[];

  // Task configuration
  tasks: Record<string, Task>;

  // Analysis options
  analyze: {
    complexity: boolean;
    dependencies: boolean;
    duplication: boolean;
    security: boolean;
  };

  // Reporting options
  reports?: {
    enabled?: boolean;
    formats?: ("json" | "html" | "markdown")[];
    types?: ("complexity" | "issues" | "dependencies" | "performance")[];
    outputDir?: string;
    includeVisualizations?: boolean;
  };

  // AI configuration
  ai?: {
    enabled: boolean;
    apiKey?: string;
    model?: string;
    optimizationMode: "suggestion" | "automatic";
    analysisDepth: "basic" | "detailed" | "comprehensive";
  };

  // CI options
  ci?: {
    enabled: boolean;
    reportFormat: "json" | "html" | "markdown";
    uploadArtifacts: boolean;
    commentPR: boolean;
  };
}

export interface BuildResult {
  success: boolean;
  duration: number;
  files?: string[];
  stats?: any;
  analysis?: AnalysisResult;
  reports?: any[];
  error?: string;
}

export interface Task {
  type: "command" | "function" | "parallel" | "series";
  command?: string;
  function?: string;
  tasks?: string[];
  options?: Record<string, any>;
}

export interface ASTNode {
  type: string;
  start: number;
  end: number;
  loc: {
    start: { line: number; column: number };
    end: { line: number; column: number };
  };
  [key: string]: any;
}

export interface SourceFile {
  path: string;
  content: string;
  ast?: ASTNode;
}

export interface ParseResult {
  files: SourceFile[];
  ast: Record<string, ASTNode>;
  errors: Record<string, Error[]>;
}

export interface AnalysisResult {
  complexity: Record<string, number>;
  dependencies: Record<string, string[]>;
  issues: Record<string, Issue[]>;
  metrics: Record<string, any>;
  score: number;
  insights: Array<{
    importance: string;
    description: string;
  }>;
  architecture: {
    components: string[];
    relationships: Record<string, string[]>;
    diagram: string;
    suggestions: string[];
  };
}

export interface Issue {
  type: "error" | "warning" | "info";
  message: string;
  file: string;
  line: number;
  column: number;
  code?: string;
  fix?: {
    start: number;
    end: number;
    replacement: string;
  };
}

export interface AIAnalysisResult {
  insights: AIInsight[];
  optimizations: AIOptimization[];
  architecture: AIArchitectureAnalysis;
  score: number;
}

export interface AIInsight {
  type: string;
  description: string;
  importance: "low" | "medium" | "high";
  files?: string[];
}

export interface AIOptimization {
  description: string;
  file: string;
  start: number;
  end: number;
  replacement: string;
  impact: "low" | "medium" | "high";
}

export interface AIArchitectureAnalysis {
  patterns: Record<string, any>;
  suggestions: string[];
  diagram?: string;
}
