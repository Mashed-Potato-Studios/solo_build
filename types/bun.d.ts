// types/bun.d.ts
interface BunNamespace {
  /**
   * Write a file to disk
   */
  write(path: string, content: string | Uint8Array): Promise<void>;
  
  /**
   * Create a directory
   */
  mkdir(path: string, options?: { recursive?: boolean }): Promise<void>;
  
  /**
   * Read a file from disk
   */
  file(path: string): {
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBuffer>;
    json<T>(): Promise<T>;
    exists(): Promise<boolean>;
  };
}

// Add Bun to the global scope
declare global {
  const Bun: BunNamespace;
}

export {};
