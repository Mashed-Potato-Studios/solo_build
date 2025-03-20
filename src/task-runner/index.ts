// src/task-runner/index.ts
import { BuildConfig } from '../../types';
import consola from 'consola';

export class TaskRunner {
  private config: BuildConfig;
  
  constructor(config: BuildConfig) {
    this.config = config;
  }
  
  async runTasks(tasks: string | string[]): Promise<void> {
    const taskArray = Array.isArray(tasks) ? tasks : [tasks];
    consola.info(`Running ${taskArray.length} tasks...`);
    
    for (const task of taskArray) {
      consola.start(`Running task: ${task}`);
      
      try {
        // Execute the task
        await this.executeTask(task);
        consola.success(`Task ${task} completed successfully`);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error(String(err));
        consola.error(`Task ${task} failed:`, error.message);
        throw error;
      }
    }
    
    consola.success('All tasks completed successfully');
  }
  
  private async executeTask(task: string): Promise<void> {
    // Task execution logic would go here
    // This is a placeholder implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });
  }
}

export default TaskRunner;

