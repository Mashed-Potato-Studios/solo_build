// src/framework-detector/index.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import { glob } from 'glob';

export interface FrameworkDetectionResult {
  framework: string;
  language: string;
  confidence: number;
  details: Record<string, any>;
}

export class FrameworkDetector {
  private projectRoot: string;
  
  constructor(projectRoot: string) {
    this.projectRoot = projectRoot;
  }
  
  async detect(): Promise<FrameworkDetectionResult> {
    console.log('Detecting project framework and language...');
    
    // Check for package.json first
    const packageJsonResult = await this.checkPackageJson();
    if (packageJsonResult && packageJsonResult.confidence > 0.8) {
      return packageJsonResult;
    }
    
    // Check for config files
    const configFileResult = await this.checkConfigFiles();
    if (configFileResult && configFileResult.confidence > 0.7) {
      return configFileResult;
    }
    
    // Check file extensions to determine language
    const languageResult = await this.detectLanguage();
    
    // If we couldn't detect a specific framework, return the language
    return {
      framework: 'generic',
      language: languageResult.language,
      confidence: languageResult.confidence,
      details: {
        message: 'No specific framework detected, using generic build process',
        ...languageResult.details
      }
    };
  }
  
  private async checkPackageJson(): Promise<FrameworkDetectionResult | null> {
    try {
      const packageJsonPath = path.join(this.projectRoot, 'package.json');
      const content = await fs.readFile(packageJsonPath, 'utf8');
      const packageJson = JSON.parse(content);
      
      const dependencies = {
        ...packageJson.dependencies || {},
        ...packageJson.devDependencies || {}
      };
      
      // Check for common frameworks
      if (dependencies.react) {
        const isNextJs = !!dependencies.next;
        const isGatsby = !!dependencies.gatsby;
        
        if (isNextJs) {
          return {
            framework: 'nextjs',
            language: 'typescript',
            confidence: 0.9,
            details: { 
              version: dependencies.next,
              hasTypeScript: !!dependencies.typescript
            }
          };
        }
        
        if (isGatsby) {
          return {
            framework: 'gatsby',
            language: 'typescript',
            confidence: 0.9,
            details: { 
              version: dependencies.gatsby,
              hasTypeScript: !!dependencies.typescript
            }
          };
        }
        
        return {
          framework: 'react',
          language: 'typescript',
          confidence: 0.9,
          details: { 
            version: dependencies.react,
            hasTypeScript: !!dependencies.typescript
          }
        };
      }
      
      if (dependencies.vue) {
        const isNuxt = !!dependencies.nuxt;
        
        if (isNuxt) {
          return {
            framework: 'nuxt',
            language: 'typescript',
            confidence: 0.9,
            details: { 
              version: dependencies.nuxt,
              hasTypeScript: !!dependencies.typescript
            }
          };
        }
        
        return {
          framework: 'vue',
          language: 'typescript',
          confidence: 0.9,
          details: { 
            version: dependencies.vue,
            hasTypeScript: !!dependencies.typescript
          }
        };
      }
      
      if (dependencies.angular || dependencies['@angular/core']) {
        return {
          framework: 'angular',
          language: 'typescript',
          confidence: 0.9,
          details: { 
            version: dependencies.angular || dependencies['@angular/core'],
            hasTypeScript: true // Angular uses TypeScript by default
          }
        };
      }
      
      if (dependencies.express) {
        return {
          framework: 'express',
          language: 'typescript',
          confidence: 0.9,
          details: { 
            version: dependencies.express,
            hasTypeScript: !!dependencies.typescript
          }
        };
      }
      
      if (dependencies.nest || dependencies['@nestjs/core']) {
        return {
          framework: 'nestjs',
          language: 'typescript',
          confidence: 0.9,
          details: { 
            version: dependencies.nest || dependencies['@nestjs/core'],
            hasTypeScript: true // NestJS uses TypeScript by default
          }
        };
      }
      
      // If we have a package.json but no recognized framework
      return {
        framework: 'node',
        language: dependencies.typescript ? 'typescript' : 'javascript',
        confidence: 0.8,
        details: { 
          hasTypeScript: !!dependencies.typescript
        }
      };
    } catch (error) {
      console.log('No package.json found or error parsing it');
      return null;
    }
  }
  
  private async checkConfigFiles(): Promise<FrameworkDetectionResult | null> {
    try {
      const files = await glob('*', { 
        cwd: this.projectRoot,
        dot: true
      });
      
      // Check for specific config files
      if (files.includes('angular.json')) {
        return {
          framework: 'angular',
          language: 'typescript',
          confidence: 0.9,
          details: { configFile: 'angular.json' }
        };
      }
      
      if (files.includes('next.config.js') || files.includes('next.config.ts')) {
        return {
          framework: 'nextjs',
          language: 'typescript',
          confidence: 0.9,
          details: { configFile: files.includes('next.config.ts') ? 'next.config.ts' : 'next.config.js' }
        };
      }
      
      if (files.includes('gatsby-config.js') || files.includes('gatsby-config.ts')) {
        return {
          framework: 'gatsby',
          language: 'typescript',
          confidence: 0.9,
          details: { configFile: files.includes('gatsby-config.ts') ? 'gatsby-config.ts' : 'gatsby-config.js' }
        };
      }
      
      if (files.includes('vue.config.js') || files.includes('vue.config.ts')) {
        return {
          framework: 'vue',
          language: 'typescript',
          confidence: 0.9,
          details: { configFile: files.includes('vue.config.ts') ? 'vue.config.ts' : 'vue.config.js' }
        };
      }
      
      if (files.includes('nuxt.config.js') || files.includes('nuxt.config.ts')) {
        return {
          framework: 'nuxt',
          language: 'typescript',
          confidence: 0.9,
          details: { configFile: files.includes('nuxt.config.ts') ? 'nuxt.config.ts' : 'nuxt.config.js' }
        };
      }
      
      if (files.includes('nest-cli.json')) {
        return {
          framework: 'nestjs',
          language: 'typescript',
          confidence: 0.9,
          details: { configFile: 'nest-cli.json' }
        };
      }
      
      // Check for TypeScript config
      if (files.includes('tsconfig.json')) {
        return {
          framework: 'typescript',
          language: 'typescript',
          confidence: 0.8,
          details: { configFile: 'tsconfig.json' }
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error checking config files:', error);
      return null;
    }
  }
  
  private async detectLanguage(): Promise<FrameworkDetectionResult> {
    try {
      // Count files by extension
      const jsFiles = await glob('**/*.js', { 
        cwd: this.projectRoot,
        ignore: ['node_modules/**', 'dist/**', 'build/**']
      });
      
      const tsFiles = await glob('**/*.ts', { 
        cwd: this.projectRoot,
        ignore: ['node_modules/**', 'dist/**', 'build/**']
      });
      
      const jsxFiles = await glob('**/*.jsx', { 
        cwd: this.projectRoot,
        ignore: ['node_modules/**', 'dist/**', 'build/**']
      });
      
      const tsxFiles = await glob('**/*.tsx', { 
        cwd: this.projectRoot,
        ignore: ['node_modules/**', 'dist/**', 'build/**']
      });
      
      const totalJsFiles = jsFiles.length + jsxFiles.length;
      const totalTsFiles = tsFiles.length + tsxFiles.length;
      
      if (totalTsFiles > 0) {
        // If there are any TypeScript files, we'll consider it a TypeScript project
        return {
          framework: 'generic',
          language: 'typescript',
          confidence: 0.7,
          details: {
            tsFiles: totalTsFiles,
            jsFiles: totalJsFiles,
            hasReactComponents: tsxFiles.length > 0 || jsxFiles.length > 0
          }
        };
      }
      
      if (totalJsFiles > 0) {
        return {
          framework: 'generic',
          language: 'javascript',
          confidence: 0.7,
          details: {
            jsFiles: totalJsFiles,
            hasReactComponents: jsxFiles.length > 0
          }
        };
      }
      
      // Default fallback
      return {
        framework: 'unknown',
        language: 'unknown',
        confidence: 0.1,
        details: {
          message: 'Could not detect language based on file extensions'
        }
      };
    } catch (error: unknown) {
      console.error('Error detecting language:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return {
        framework: 'unknown',
        language: 'unknown',
        confidence: 0.1,
        details: {
          error: errorMessage
        }
      };
    }
  }
}
