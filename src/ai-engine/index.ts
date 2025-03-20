// src/ai-engine/index.ts
import { OpenAI } from 'openai';
import { BuildConfig, AIAnalysisResult, AIInsight, AIOptimization, AIArchitectureAnalysis } from '../../types';

export class AIEngine {
  private config: BuildConfig['ai'];
  private openai: OpenAI | null = null;
  
  constructor(aiConfig?: BuildConfig['ai']) {
    this.config = aiConfig || {
      enabled: false,
      optimizationMode: 'suggestion',
      analysisDepth: 'basic'
    };
    
    if (this.config?.enabled && this.config?.apiKey) {
      this.openai = new OpenAI({
        apiKey: this.config.apiKey
      });
    }
  }
  
  async analyzeArchitecture(ast: Record<string, any>, analysisResult: any): Promise<AIAnalysisResult> {
    if (!this.config?.enabled || !this.openai) {
      console.log('AI analysis is disabled or API key not provided');
      return this.generateEmptyResult();
    }
    
    console.log('Performing AI analysis of code architecture...');
    
    try {
      // Extract relevant information from the AST
      const codeStructure = this.extractCodeStructure(ast);
      
      // Extract metrics from analysis result
      const metrics = this.extractMetrics(analysisResult);
      
      // Generate prompt for the AI
      const prompt = this.generateArchitecturePrompt(codeStructure, metrics);
      
      // Call OpenAI API
      const response = await this.openai.chat.completions.create({
        model: this.config.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert software architect and code reviewer. Analyze the provided code structure and metrics to identify architectural patterns, potential issues, and optimization opportunities.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      });
      
      // Parse the AI response
      return this.parseAIResponse(response.choices[0].message.content || '');
    } catch (error) {
      console.error('Error during AI analysis:', error);
      return this.generateEmptyResult();
    }
  }
  
  private extractCodeStructure(ast: Record<string, any>): any {
    // Extract relevant information from the AST
    const structure: Record<string, any> = {};
    
    for (const [filePath, fileAst] of Object.entries(ast)) {
      // Extract imports, exports, classes, functions, etc.
      const fileStructure = {
        imports: this.extractImports(fileAst),
        exports: this.extractExports(fileAst),
        classes: this.extractClasses(fileAst),
        functions: this.extractFunctions(fileAst)
      };
      
      structure[filePath] = fileStructure;
    }
    
    return structure;
  }
  
  private extractImports(ast: any): string[] {
    // This is a placeholder. In a real implementation, you would traverse the AST
    return [];
  }
  
  private extractExports(ast: any): string[] {
    // This is a placeholder. In a real implementation, you would traverse the AST
    return [];
  }
  
  private extractClasses(ast: any): any[] {
    // This is a placeholder. In a real implementation, you would traverse the AST
    return [];
  }
  
  private extractFunctions(ast: any): any[] {
    // This is a placeholder. In a real implementation, you would traverse the AST
    return [];
  }
  
  private extractMetrics(analysisResult: any): any {
    // Extract relevant metrics from the analysis result
    return {
      complexity: analysisResult.complexity || {},
      dependencies: analysisResult.dependencies || {},
      issueCount: analysisResult.issues?.length || 0
    };
  }
  
  private generateArchitecturePrompt(codeStructure: any, metrics: any): string {
    // Generate a detailed prompt for the AI
    return `
    # Code Architecture Analysis Request
    
    ## Project Structure
    \`\`\`json
    ${JSON.stringify(codeStructure, null, 2)}
    \`\`\`
    
    ## Metrics
    \`\`\`json
    ${JSON.stringify(metrics, null, 2)}
    \`\`\`
    
    ## Analysis Request
    Please analyze this code architecture and provide:
    
    1. Identified architectural patterns
    2. Potential issues or anti-patterns
    3. Optimization suggestions
    4. Overall architecture score (0-100)
    5. Dependency graph insights
    
    Format your response as JSON with the following structure:
    \`\`\`json
    {
      "insights": [
        {
          "type": "pattern|issue|suggestion",
          "description": "Detailed description",
          "importance": "low|medium|high",
          "files": ["file/paths/affected"]
        }
      ],
      "optimizations": [
        {
          "description": "What should be optimized",
          "file": "file/path",
          "impact": "low|medium|high"
        }
      ],
      "architecture": {
        "patterns": {
          "patternName": "description"
        },
        "suggestions": [
          "Architectural improvement suggestion"
        ]
      },
      "score": 75
    }
    \`\`\`
    `;
  }
  
  private parseAIResponse(response: string): AIAnalysisResult {
    try {
      // Extract JSON from the response
      const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/) || 
                        response.match(/```\n([\s\S]*?)\n```/) ||
                        [null, response];
      
      const jsonString = jsonMatch[1];
      const result = JSON.parse(jsonString);
      
      return {
        insights: result.insights || [],
        optimizations: result.optimizations || [],
        architecture: result.architecture || {
          patterns: {},
          suggestions: []
        },
        score: result.score || 0
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.generateEmptyResult();
    }
  }
  
  private generateEmptyResult(): AIAnalysisResult {
    return {
      insights: [],
      optimizations: [],
      architecture: {
        patterns: {},
        suggestions: []
      },
      score: 0
    };
  }
  
  // Method to generate optimized code based on AI suggestions
  async generateOptimizedCode(file: string, code: string): Promise<string> {
    if (!this.config?.enabled || !this.openai) {
      return code;
    }
    
    try {
      const response = await this.openai.chat.completions.create({
        model: this.config.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert code optimizer. Improve the provided code without changing its functionality.'
          },
          {
            role: 'user',
            content: `Please optimize this code from ${file}:\n\n${code}`
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      });
      
      const optimizedCode = response.choices[0].message.content || code;
      
      // Extract code block if present
      const codeMatch = optimizedCode.match(/```(?:typescript|javascript|ts|js)?\n([\s\S]*?)\n```/) || 
                        [null, optimizedCode];
      
      return codeMatch[1].trim();
    } catch (error) {
      console.error('Error generating optimized code:', error);
      return code;
    }
  }
  
  // Method to suggest workflow based on detected framework
  async suggestWorkflow(framework: string, language: string): Promise<any> {
    if (!this.config?.enabled || !this.openai) {
      return this.getDefaultWorkflow(framework, language);
    }
    
    try {
      const response = await this.openai.chat.completions.create({
        model: this.config.model || 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in CI/CD workflows. Generate an optimal GitHub Actions-like workflow for the specified framework and language.'
          },
          {
            role: 'user',
            content: `Generate a workflow for a ${framework} project using ${language}. The workflow should include build, test, and deployment steps.`
          }
        ],
        temperature: 0.2,
        max_tokens: 2000
      });
      
      const workflowYaml = response.choices[0].message.content || '';
      
      // Extract YAML block if present
      const yamlMatch = workflowYaml.match(/```ya?ml\n([\s\S]*?)\n```/) || 
                        [null, workflowYaml];
      
      return yamlMatch[1].trim();
    } catch (error) {
      console.error('Error suggesting workflow:', error);
      return this.getDefaultWorkflow(framework, language);
    }
  }
  
  private getDefaultWorkflow(framework: string, language: string): string {
    // Return a default workflow based on the framework and language
    return `
name: Default ${framework} Workflow

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Test
      run: npm test
    `;
  }
}
