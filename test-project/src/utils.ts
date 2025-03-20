// Generated code
import { LogLevel } from './types';

// Person interface
export interface Person {
  name: string;
  age: number;
  email: string;
  address?: string;
}

/**
 * Greet a person
 * @param person The person to greet
 * @returns A greeting message
 */
export function greet(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

/**
 * Format a date to a string
 * @param date The date to format
 * @param format Optional format string
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: string = 'YYYY-MM-DD'): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', year.toString())
    .replace('MM', month)
    .replace('DD', day);
}

/**
 * Simple logger function
 * @param message Message to log
 * @param level Log level
 */
export function log(message: string, level: LogLevel = LogLevel.INFO): void {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`);
}