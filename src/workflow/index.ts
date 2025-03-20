// src/workflow/index.ts
import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { EventEmitter } from 'events';
import { BuildConfig } from '../../types';
import { getWorkflowTemplate } from './templates';
import consola from 'consola';
import { AIEngine } from '../ai-engine';

export interface WorkflowEvent {
  name: string;
  payload: any;
}

export interface WorkflowJob {
  name: string;
  steps: WorkflowStep[];
  needs?: string[];
  if?: string;
  environment?: string;
  outputs?: Record<string, string>;
}

export interface WorkflowStep {
  name: string;
  uses?: string;
  run?: string;
  with?: Record<string, any>;
  env?: Record<string, string>;
  if?: string;
  id?: string;
}

export interface Workflow {
  name: string;
  on: string | string[] | Record<string, any>;
  jobs: Record<string, WorkflowJob>;
}

export class WorkflowEngine extends EventEmitter {
  private config: BuildConfig;
  private workflows: Map<string, Workflow> = new Map();
  private workflowsDir: string;
  private context: Record<string, any> = {};
  private aiEngine: AIEngine | null = null;

  constructor(config: BuildConfig) {
    super();
    this.config = config;
    this.workflowsDir = path.join(config.projectRoot, '.workflows');

    // Initialize AI engine if available
    if (config.ai?.enabled) {
      this.aiEngine = new AIEngine(config.ai);
    }
  }

  async loadWorkflows(): Promise<void> {
    try {
      await fs.mkdir(this.workflowsDir, { recursive: true });

      const files = await fs.readdir(this.workflowsDir);
      const yamlFiles = files.filter(file => file.endsWith('.yml') || file.endsWith('.yaml'));

      for (const file of yamlFiles) {
        const filePath = path.join(this.workflowsDir, file);
        const content = await fs.readFile(filePath, 'utf8');
        const workflow = yaml.load(content) as Workflow;

        if (workflow && workflow.name) {
          this.workflows.set(workflow.name, workflow);
          consola.debug(`Loaded workflow: ${workflow.name}`);
        }
      }

      consola.info(`Loaded ${this.workflows.size} workflows`);
    } catch (error) {
      consola.error('Error loading workflows:', error);
    }
  }

  async triggerEvent(event: WorkflowEvent): Promise<void> {
    consola.info(`Event triggered: ${event.name}`);
    this.emit('event', event);

    // Find workflows that should be triggered by this event
    const matchingWorkflows = Array.from(this.workflows.values()).filter(workflow => {
      if (typeof workflow.on === 'string') {
        return workflow.on === event.name;
      } else if (Array.isArray(workflow.on)) {
        return workflow.on.includes(event.name);
      } else if (typeof workflow.on === 'object') {
        return workflow.on[event.name] !== undefined;
      }
      return false;
    });

    if (matchingWorkflows.length === 0) {
      consola.warn(`No workflows found for event: ${event.name}`);
      return;
    }

    // Execute matching workflows
    for (const workflow of matchingWorkflows) {
      await this.executeWorkflow(workflow, event);
    }
  }

  private async executeWorkflow(workflow: Workflow, event: WorkflowEvent): Promise<void> {
    consola.info(`Executing workflow: ${workflow.name}`);
    this.emit('workflow_start', { workflow, event });

    // Update context with event data
    this.context = {
      ...this.context,
      event: event.payload,
      env: process.env
    };

    // Identify jobs with no dependencies
    const independentJobs = Object.entries(workflow.jobs)
      .filter(([_, job]) => !job.needs || job.needs.length === 0)
      .map(([name, job]) => ({ name, job }));

    // Execute independent jobs
    await Promise.all(independentJobs.map(({ name, job }) => 
      this.executeJob(name, job, workflow)
    ));

    this.emit('workflow_complete', { workflow, event });
  }

  private async executeJob(jobName: string, job: WorkflowJob, workflow: Workflow): Promise<Record<string, any>> {
    consola.info(`Executing job: ${job.name || jobName}`);
    this.emit('job_start', { jobName, job });

    const outputs: Record<string, any> = {};

    // Execute job steps sequentially
    for (const step of job.steps) {
      const stepResult = await this.executeStep(step, jobName);

      // Store step outputs if it has an ID
      if (step.id && stepResult) {
        outputs[step.id] = stepResult;
      }
    }

    this.emit('job_complete', { jobName, job, outputs });

    // Execute dependent jobs
    const dependentJobs = Object.entries(workflow.jobs)
      .filter(([_, j]) => j.needs && j.needs.includes(jobName))
      .map(([name, j]) => ({ name, job: j }));

    await Promise.all(dependentJobs.map(({ name, job }) => 
      this.executeJob(name, job, workflow)
    ));

    return outputs;
  }

  private async executeStep(step: WorkflowStep, jobName: string): Promise<any> {
    consola.info(`Executing step: ${step.name}`);
    this.emit('step_start', { step, jobName });

    let result = null;

    try {
      if (step.run) {
        // Execute shell command
        result = await this.executeCommand(step.run, step.env || {});
      } else if (step.uses) {
        // Execute action
        result = await this.executeAction(step.uses, step.with || {});
      }

      this.emit('step_complete', { step, jobName, result });
    } catch (error) {
      consola.error(`Error executing step ${step.name}:`, error);
      this.emit('step_error', { step, jobName, error });
      throw error;
    }

    return result;
  }

  private async executeCommand(command: string, env: Record<string, string>): Promise<string> {
    // This is a placeholder. In a real implementation, you would use child_process or similar
    consola.info(`Executing command: ${command}`);
    return `Command executed: ${command}`;
  }

  private async executeAction(actionName: string, inputs: Record<string, any>): Promise<any> {
    // This is a placeholder. In a real implementation, you would load and execute the action
    consola.info(`Executing action: ${actionName} with inputs:`, inputs);
    return { success: true, actionName, inputs };
  }

  /**
   * Get a list of all available workflows
   */
  getWorkflows(): { name: string; description: string }[] {
    return Array.from(this.workflows.entries()).map(([_, workflow]) => ({
      name: workflow.name,
      description: workflow.name // In a real implementation, you might extract a description from the workflow
    }));
  }

  /**
   * Suggest a workflow based on the framework and language
   */
  async suggestWorkflow(framework: string, language: string): Promise<string> {
    consola.info(`Suggesting workflow for ${framework} (${language})`);

    // Try to use AI to generate a custom workflow if available
    if (this.aiEngine && this.config.ai?.enabled) {
      try {
        const aiWorkflow = await this.aiEngine.suggestWorkflow(framework, language);
        if (aiWorkflow) {
          consola.success('Generated AI-powered workflow');
          return aiWorkflow;
        }
      } catch (error) {
        consola.warn('Failed to generate AI workflow, falling back to template');
      }
    }

    // Fall back to template
    const template = getWorkflowTemplate(framework, language);
    return yaml.dump(template);
  }

  /**
   * Create a new workflow file
   */
  async createWorkflow(name: string, workflow: Workflow): Promise<void> {
    const filePath = path.join(this.workflowsDir, `${name}.yml`);
    const content = yaml.dump(workflow);

    await fs.mkdir(this.workflowsDir, { recursive: true });
    await fs.writeFile(filePath, content, 'utf8');
    this.workflows.set(name, workflow);

    consola.success(`Created workflow: ${name}`);
  }

  /**
   * Delete a workflow
   */
  async deleteWorkflow(name: string): Promise<boolean> {
    const workflow = this.workflows.get(name);
    if (!workflow) {
      consola.warn(`Workflow not found: ${name}`);
      return false;
    }

    const filePath = path.join(this.workflowsDir, `${name}.yml`);

    try {
      await fs.unlink(filePath);
      this.workflows.delete(name);
      consola.success(`Deleted workflow: ${name}`);
      return true;
    } catch (error) {
      consola.error(`Failed to delete workflow ${name}:`, error);
      return false;
    }
  }
}
