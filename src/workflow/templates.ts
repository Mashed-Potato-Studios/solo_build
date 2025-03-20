// src/workflow/templates.ts
import { Workflow } from './index';

/**
 * Get a workflow template for a specific framework
 */
export function getWorkflowTemplate(framework: string, language: string): Workflow {
  // Select the appropriate template based on framework and language
  switch (framework.toLowerCase()) {
    case 'react':
      return reactWorkflow(language);
    case 'nextjs':
      return nextjsWorkflow(language);
    case 'vue':
      return vueWorkflow(language);
    case 'angular':
      return angularWorkflow(language);
    case 'node':
    case 'express':
      return nodeWorkflow(language);
    case 'nestjs':
      return nestjsWorkflow(language);
    default:
      return genericWorkflow(language);
  }
}

/**
 * Generic workflow template
 */
function genericWorkflow(language: string): Workflow {
  return {
    name: 'Generic Build Workflow',
    on: ['push', 'workflow_dispatch'],
    jobs: {
      build: {
        name: 'Build',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v3'
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v3',
            with: {
              'node-version': '18'
            }
          },
          {
            name: 'Install dependencies',
            run: 'npm ci'
          },
          {
            name: 'Lint',
            run: 'npm run lint',
            if: 'test -f "package.json" && grep -q "lint" "package.json"'
          },
          {
            name: 'Build',
            run: 'npm run build',
            if: 'test -f "package.json" && grep -q "build" "package.json"'
          },
          {
            name: 'Test',
            run: 'npm test',
            if: 'test -f "package.json" && grep -q "test" "package.json"'
          }
        ]
      }
    }
  };
}

/**
 * React workflow template
 */
function reactWorkflow(language: string): Workflow {
  return {
    name: 'React Build Workflow',
    on: ['push', 'workflow_dispatch'],
    jobs: {
      build: {
        name: 'Build and Test',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v3'
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v3',
            with: {
              'node-version': '18'
            }
          },
          {
            name: 'Install dependencies',
            run: 'npm ci'
          },
          {
            name: 'Lint',
            run: 'npm run lint',
            if: 'test -f "package.json" && grep -q "lint" "package.json"'
          },
          {
            name: 'Test',
            run: 'npm test',
            if: 'test -f "package.json" && grep -q "test" "package.json"'
          },
          {
            name: 'Build',
            run: 'npm run build'
          },
          {
            name: 'Analyze bundle',
            run: 'npx source-map-explorer "build/static/js/*.js"',
            if: 'test -d "build/static/js"'
          }
        ]
      }
    }
  };
}

/**
 * Next.js workflow template
 */
function nextjsWorkflow(language: string): Workflow {
  return {
    name: 'Next.js Build Workflow',
    on: ['push', 'workflow_dispatch'],
    jobs: {
      build: {
        name: 'Build and Test',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v3'
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v3',
            with: {
              'node-version': '18'
            }
          },
          {
            name: 'Install dependencies',
            run: 'npm ci'
          },
          {
            name: 'Lint',
            run: 'npm run lint'
          },
          {
            name: 'Test',
            run: 'npm test',
            if: 'test -f "package.json" && grep -q "test" "package.json"'
          },
          {
            name: 'Build',
            run: 'npm run build'
          },
          {
            name: 'Analyze bundle',
            run: 'npx cross-env ANALYZE=true npm run build',
            if: 'test -f "next.config.js" && grep -q "withBundleAnalyzer" "next.config.js"'
          }
        ]
      }
    }
  };
}

/**
 * Vue workflow template
 */
function vueWorkflow(language: string): Workflow {
  return {
    name: 'Vue Build Workflow',
    on: ['push', 'workflow_dispatch'],
    jobs: {
      build: {
        name: 'Build and Test',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v3'
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v3',
            with: {
              'node-version': '18'
            }
          },
          {
            name: 'Install dependencies',
            run: 'npm ci'
          },
          {
            name: 'Lint',
            run: 'npm run lint',
            if: 'test -f "package.json" && grep -q "lint" "package.json"'
          },
          {
            name: 'Test',
            run: 'npm run test:unit',
            if: 'test -f "package.json" && grep -q "test:unit" "package.json"'
          },
          {
            name: 'Build',
            run: 'npm run build'
          }
        ]
      }
    }
  };
}

/**
 * Angular workflow template
 */
function angularWorkflow(language: string): Workflow {
  return {
    name: 'Angular Build Workflow',
    on: ['push', 'workflow_dispatch'],
    jobs: {
      build: {
        name: 'Build and Test',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v3'
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v3',
            with: {
              'node-version': '18'
            }
          },
          {
            name: 'Install dependencies',
            run: 'npm ci'
          },
          {
            name: 'Lint',
            run: 'ng lint',
            if: 'test -f "angular.json" && grep -q "lint" "angular.json"'
          },
          {
            name: 'Test',
            run: 'ng test --watch=false --browsers=ChromeHeadless'
          },
          {
            name: 'Build',
            run: 'ng build --configuration production'
          }
        ]
      }
    }
  };
}

/**
 * Node.js workflow template
 */
function nodeWorkflow(language: string): Workflow {
  return {
    name: 'Node.js Build Workflow',
    on: ['push', 'workflow_dispatch'],
    jobs: {
      build: {
        name: 'Build and Test',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v3'
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v3',
            with: {
              'node-version': '18'
            }
          },
          {
            name: 'Install dependencies',
            run: 'npm ci'
          },
          {
            name: 'Lint',
            run: 'npm run lint',
            if: 'test -f "package.json" && grep -q "lint" "package.json"'
          },
          {
            name: 'Test',
            run: 'npm test',
            if: 'test -f "package.json" && grep -q "test" "package.json"'
          },
          {
            name: 'Build',
            run: 'npm run build',
            if: 'test -f "package.json" && grep -q "build" "package.json"'
          }
        ]
      }
    }
  };
}

/**
 * NestJS workflow template
 */
function nestjsWorkflow(language: string): Workflow {
  return {
    name: 'NestJS Build Workflow',
    on: ['push', 'workflow_dispatch'],
    jobs: {
      build: {
        name: 'Build and Test',
        steps: [
          {
            name: 'Checkout code',
            uses: 'actions/checkout@v3'
          },
          {
            name: 'Setup Node.js',
            uses: 'actions/setup-node@v3',
            with: {
              'node-version': '18'
            }
          },
          {
            name: 'Install dependencies',
            run: 'npm ci'
          },
          {
            name: 'Lint',
            run: 'npm run lint'
          },
          {
            name: 'Test',
            run: 'npm run test'
          },
          {
            name: 'Test e2e',
            run: 'npm run test:e2e',
            if: 'test -f "package.json" && grep -q "test:e2e" "package.json"'
          },
          {
            name: 'Build',
            run: 'npm run build'
          }
        ]
      }
    }
  };
}
