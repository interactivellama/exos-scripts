#!/usr/bin/env node
import chalk from 'chalk';
import path from 'path';
import { ESLint, Linter } from 'eslint';
import { SOURCE_PATH } from '../../common/paths';
import getConfigToUse from '../../common/getConfigToUse';
import getFilesToUse from '../../common/getFilesToUse';
import getArgumentValue from '../../common/getArgumentValue';
import { ExosScripts } from '../../common/types';

import eslintrcLibrary = require('./.eslintrc.library');
import eslintrcReact = require('./.eslintrc.react');

// Choose which default configuration to use
const isLibrary = getArgumentValue(process.argv, 'type').toLowerCase() === 'library';
const eslintrc: unknown = isLibrary ? eslintrcLibrary : eslintrcReact;

// Resolve configuration to use
const configToUse = getConfigToUse<Linter.Config>(ExosScripts.lint, eslintrc as Linter.Config);
console.log(configToUse !== eslintrc ? 'Found custom lint config' : 'Using default lint config');

// Resolve files to use
const defaultFilesToUse = [path.join(SOURCE_PATH, '/**/*.{ts,tsx}')];
const filesToUse = getFilesToUse('--files=', defaultFilesToUse);
console.log(filesToUse !== defaultFilesToUse ? `Found custom rule to identify files to use: ${filesToUse}` : 'Using default rule to identify files');

(async function main(): Promise<void> {
  const hasFixFlag = process.argv.indexOf('--fix') !== -1;

  // Create an instance with the `fix` option.
  const eslint = new ESLint({
    baseConfig: configToUse,
    fix: hasFixFlag,
    useEslintrc: false,
  });

  try {
    // Lint files and get the lint result
    const results = await eslint.lintFiles(filesToUse);

    // If "--fix" is provided, modify the files with the fixed code
    if (hasFixFlag) {
      await ESLint.outputFixes(results);
    }

    // ESLint results is a collection of individual results (one per file)
    // Generate a global results object containing the error count of each individual file
    const globalResults = results.reduce(
      (globalAcc, result) => {
        /* eslint-disable no-param-reassign */
        globalAcc.errorCount += result.errorCount;
        globalAcc.warningCount += result.warningCount;
        /* eslint-enable */
        return globalAcc;
      },
      {
        errorCount: 0,
        warningCount: 0,
      },
    );

    // Format the (global) results and output them
    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);
    console.log(resultText);

    // Exit the process based on the (global) results

    if (globalResults.errorCount > 0) {
      process.exit(1);
    }

    const maxWarnings = getArgumentValue(process.argv, 'max-warnings', '-1');
    if (maxWarnings !== '-1' && globalResults.warningCount > parseInt(maxWarnings, 10)) {
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    // eslint.lintFiles could throw errors
    // See https://eslint.org/docs/developer-guide/nodejs-api#%E2%97%86-new-eslint-options
    console.error(chalk.red('❌ There was an error while running lint. Please fix it and try again'));
    console.error(error);
    process.exit(1);
  }
}());
