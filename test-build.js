// test-build.js
const { build } = require('./dist/src/index');
const path = require('path');

// Load the test project config
const config = require('./test-project/build.config.js');

// Ensure paths are absolute
config.projectRoot = path.resolve(__dirname, 'test-project');
config.sourceDir = path.resolve(config.projectRoot, config.sourceDir);
config.outDir = path.resolve(config.projectRoot, config.outDir);

// Run the build
async function runBuild() {
  console.log('Starting build with config:', JSON.stringify(config, null, 2));
  
  try {
    const result = await build(config);
    console.log('Build result:', JSON.stringify(result, null, 2));
    
    if (result.success) {
      console.log(`Build completed successfully in ${result.duration}ms`);
      console.log(`Generated ${result.files?.length || 0} files`);
      
      if (result.analysis) {
        console.log(`Architecture score: ${result.analysis.score}/100`);
      }
    } else {
      console.error(`Build failed: ${result.error}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Build failed with error:', error);
    process.exit(1);
  }
}

runBuild();
