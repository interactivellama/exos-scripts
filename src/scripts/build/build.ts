#!/usr/bin/env node

import chalk from 'chalk';
import webpack from 'webpack';
import webpackConfig from '../../webpack/webpack.config';
import getConfigToUse from '../../common/getConfigToUse';
import { ExosScripts } from '../../common/types';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'prod';
}

const configToUse = getConfigToUse<webpack.Configuration>(ExosScripts.build, webpackConfig);
console.log(configToUse !== webpackConfig ? 'Found custom build config' : 'Using default build config');

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(configToUse);

compiler.run((err: Error, stats: webpack.Stats) => {
  // The err object will only contain webpack-related issues, such as misconfiguration, etc.
  // Compilation errors are stored in stats.hasErrors()

  if (err) {
    console.log();
    console.log(chalk.red('❌ There are compilation errors. Fix them and try again.'));
    console.log(err.message);
    console.log(err.stack || err);
    console.log();

    // Exit with a failure code
    process.exit(1);
  }

  const executionStats = stats.toJson({ all: false, warnings: true, errors: true });

  if (executionStats.errors.length) {
    // Only print the first error. Others are often indicative
    // of the same problem, and the extra noise will confuse the reader.
    console.log();
    console.log(chalk.red('❌ There was an error during build.'));
    console.log(executionStats.errors[0]);
    console.log();

    // Exit with a failure code
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    // Print all the warnings, but don't fail
    console.log();
    console.log(chalk.yellow('🚧 There were warnings during build.'));
    executionStats.warnings.forEach((warning) => console.warn(chalk.yellow(warning)));
    console.log();

    // Exit with an OK code
    process.exit(0);
  }

  console.log(chalk.green('✅ Build completed successfully.'));
  console.log();
});
