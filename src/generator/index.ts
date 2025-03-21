// src/generator/index.ts
import * as fs from "fs/promises";
import * as path from "path";
import { BuildConfig } from "../../types";
import consola from "consola";
import generate from "@babel/generator";

export interface GenerateResult {
  files: string[];
  stats: {
    totalFiles: number;
    totalSize: number;
  };
}

export class Generator {
  private config: BuildConfig;
  private outputFiles: string[] = [];
  private outputSize: number = 0;

  constructor(config: BuildConfig) {
    this.config = config;
  }

  async generate(transformedAst: Record<string, any>): Promise<GenerateResult> {
    consola.info("Generating output files...");

    const outputFiles: string[] = [];
    let totalSize = 0;

    // Create output directory if it doesn't exist
    const outDirPath = path.resolve(
      this.config.projectRoot,
      this.config.outDir
    );
    await fs.mkdir(outDirPath, { recursive: true });

    // Process each file's AST and generate output
    for (const filePath in transformedAst) {
      const fileAst = transformedAst[filePath];

      // Generate output file path
      const relativePath = path.relative(
        path.resolve(this.config.projectRoot, this.config.sourceDir),
        filePath
      );

      // Change extension if needed (e.g., .ts to .js)
      let outputRelativePath = relativePath;
      if (path.extname(relativePath) === ".ts") {
        outputRelativePath = relativePath.replace(/\.ts$/, ".js");
      }

      const outputPath = path.join(outDirPath, outputRelativePath);

      // Ensure directory exists
      const outputDir = path.dirname(outputPath);
      await fs.mkdir(outputDir, { recursive: true });

      // Generate code from AST
      let code = this.generateCode(fileAst);

      // Generate source map if enabled
      if (this.config.sourceMaps) {
        const result = this.generateCode(fileAst, {
          sourceMaps: true,
          sourceFileName: relativePath,
        });

        // Write source map file
        const sourceMapPath = `${outputPath}.map`;
        await fs.writeFile(sourceMapPath, JSON.stringify(result.map), "utf8");

        // Add source map reference to code
        code = `${result.code}\n//# sourceMappingURL=${path.basename(
          outputPath
        )}.map`;
      }

      // Minify if enabled
      const finalCode = this.config.minify ? this.minifyCode(code) : code;

      // Write to file
      await fs.writeFile(outputPath, finalCode, "utf8");

      // Get file size
      const stats = await fs.stat(outputPath);
      totalSize += stats.size;

      outputFiles.push(outputPath);
    }

    consola.success(`Generated ${outputFiles.length} files`);

    // Track generated files
    this.outputFiles = outputFiles;

    // Calculate total output size
    this.outputSize = totalSize;

    return {
      files: outputFiles,
      stats: {
        totalFiles: outputFiles.length,
        totalSize,
      },
    };
  }

  private generateCode(ast: any, options: Record<string, any> = {}): any {
    try {
      // Use Babel's generator to convert AST to code
      const result = generate(ast, {
        comments: true,
        compact: this.config.minify,
        ...options,
      });

      return options.sourceMaps ? result : result.code;
    } catch (error) {
      consola.error("Error generating code from AST:", error);
      return "// Error generating code";
    }
  }

  private minifyCode(code: string): string {
    // Simple minification - in a real implementation,
    // you would use a proper minifier like terser
    try {
      // Remove comments
      code = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "");
      // Remove whitespace
      code = code.replace(/\s+/g, " ");
      return code;
    } catch (error) {
      consola.warn("Error minifying code:", error);
      return code;
    }
  }

  // Add methods to get generated files and size
  getFiles(): string[] {
    return this.outputFiles;
  }

  getOutputSize(): number {
    return this.outputSize;
  }
}
