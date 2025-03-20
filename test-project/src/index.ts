// Generated code

import { greet, Person } from './utils';
import { Config } from './types';

// Sample configuration
const config: Config = {
  appName: 'TestApp',
  version: '1.0.0',
  debug: true
};

// Create a person
const person: Person = {
  name: 'John Doe',
  age: 30,
  email: 'john@example.com'
};

// Main function
function main(): void {
  console.log(`Starting ${config.appName} v${config.version}`);
  console.log(greet(person));
  
  if (config.debug) {
    console.log('Debug mode is enabled');
  }
}

// Run the app
main();