// Type definitions for consola
declare module 'consola' {
  interface ConsolaInstance {
    info(message: string, ...args: any[]): void;
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    error(message: string, ...args: any[]): void;
    success(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    trace(message: string, ...args: any[]): void;
    fatal(message: string, ...args: any[]): void;
    silent(message: string, ...args: any[]): void;
    ready(message: string, ...args: any[]): void;
    start(message: string, ...args: any[]): void;
    box(message: string, ...args: any[]): void;
  }

  const consola: ConsolaInstance;
  export default consola;
}
