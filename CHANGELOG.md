# Changelog

All notable changes to the Solo Build project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-03-20

### Added

#### Core System

- Initial release of Solo Build framework
- Parser component with support for JavaScript and TypeScript
- Analyzer for code complexity, dependencies, and issues detection
- Transformer for code optimization
- Generator for output file creation
- Workflow Engine with GitHub Actions-like syntax
- Task Runner for executing build tasks
- Reporter for generating detailed reports
- AI Engine for code analysis and optimization suggestions
- Configuration system with defaults and merging

#### CLI

- `init` command for project initialization with templates
- `run` command for executing the build process
- `analyze` command for code analysis
- `workflow` command for managing workflows

#### Framework Support

- React application support with JSX optimization
- Vue.js application support with SFC compilation
- Node.js library support with multi-format output

#### Documentation

- Comprehensive documentation for all components
- Getting started guide
- Configuration reference
- Architecture documentation
- CLI commands reference
- Example projects

### Fixed

- TypeScript errors in packages/analyser/index.ts - Updated issues property in AnalysisResult to be Record<string, Issue[]>
- Type issues in packages/parser/index.ts - Fixed AST node type mismatch
- CLI argument type issues in src/cli.ts - Improved handling of string | boolean | string[] types
- Added missing Bun type declarations in src/cli.ts and src/config/index.ts
- Property access errors in src/index.ts - Fixed missing properties and type mismatches
- Method signature mismatches in TaskRunner.runTasks - Fixed parameter type mismatch

## [0.9.0] - 2025-03-15

### Added

- Initial beta version of Solo Build
- Basic parsing and analysis capabilities
- Simple workflow system
- Command-line interface with basic commands
- Configuration system
- Documentation website structure

### Changed

- Switched from Babel to oxc for improved parsing performance
- Updated dependency handling to support ESM and CommonJS

### Fixed

- Various TypeScript type issues
- Configuration loading errors
- Path resolution in Windows environments

## [0.8.0] - 2025-03-01

### Added

- Alpha version with core functionality
- Basic CLI implementation
- Initial documentation

### Known Issues

- Limited framework support
- Performance issues with large codebases
- Incomplete TypeScript support

## [0.2.0] - 2024-07-17

### Added

- Comprehensive reporting system with multiple formats (HTML, JSON, Markdown)
- Interactive visualizations for code complexity and dependencies
- New `report` CLI command for managing and viewing generated reports
- Enhanced `analyze` command with report type and format filtering
- Template support for customizable report generation
- EJS integration for HTML report templating
- Performance metrics tracking and reporting
- Build time analysis features

### Changed

- Expanded configuration options in `solo-build.config.js` for report customization
- Improved CLI integration with new options for report formats and types
- Enhanced documentation with comprehensive examples
- Updated website documentation with detailed guides for reporting features

### Fixed

- Type compatibility issues in reporter integration
- File path handling in report generation and visualization
