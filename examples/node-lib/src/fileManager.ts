/**
 * File manager module for common file system operations
 */

import * as fs from 'fs';
import * as path from 'path';

export class FileManager {
  /**
   * Read a file and return its contents
   * @param filePath Path to the file
   * @returns File contents as string
   */
  static readFile(filePath: string): Promise<string> {
    return fs.promises.readFile(filePath, 'utf-8');
  }

  /**
   * Write content to a file
   * @param filePath Path to the file
   * @param content Content to write
   */
  static writeFile(filePath: string, content: string): Promise<void> {
    return fs.promises.writeFile(filePath, content, 'utf-8');
  }

  /**
   * Check if a file exists
   * @param filePath Path to the file
   * @returns True if the file exists, false otherwise
   */
  static fileExists(filePath: string): boolean {
    return fs.existsSync(filePath);
  }

  /**
   * Create a directory if it doesn't exist
   * @param dirPath Path to the directory
   */
  static createDirectory(dirPath: string): Promise<void> {
    return fs.promises.mkdir(dirPath, { recursive: true });
  }

  /**
   * List all files in a directory
   * @param dirPath Path to the directory
   * @returns Array of file names
   */
  static listFiles(dirPath: string): Promise<string[]> {
    return fs.promises.readdir(dirPath);
  }

  /**
   * Get file stats
   * @param filePath Path to the file
   * @returns File stats
   */
  static getFileStats(filePath: string): Promise<fs.Stats> {
    return fs.promises.stat(filePath);
  }
}
