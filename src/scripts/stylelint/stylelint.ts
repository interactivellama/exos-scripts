#!/usr/bin/env node

import chalk from 'chalk';
import stylelint from 'stylelint';
import { ROOT_PATH } from '../../common/paths';
import getConfigToUse from '../../common/getConfigToUse';
import getFilesToUse from '../../common/getFilesToUse';
import { ExosScripts } from '../../common/types';

import stylelintrc = require('./.stylelintrc.js');

(async function main(): Promise<void> {
  // Resolve configuration to use
  const configToUse = getConfigToUse(ExosScripts.stylelint, stylelintrc);
  console.log(configToUse !== stylelintrc ? 'Found custom stylelint config' : 'Using default stylelint config');

  // Resolve files to use
  /**
   * Using relative path here due to an issue with stylelint path resolution:
   * it does not work with Windows style paths correctly
   */
  const defaultFilesToUse = ['./**/*.{scss,css}'];
  const filesToUse = getFilesToUse('--files=', defaultFilesToUse);
  console.log(filesToUse !== defaultFilesToUse ? 'Found custom rule to identify files to use' : 'Using default rule to identify files');

  try {
    // Lint files and get the lint result
    const options = { config: configToUse, files: filesToUse };
    const { errored, results } = await stylelint.lint(options);

    // Output the results and exit the process based on them
    if (errored) {
      console.log();
      console.log(chalk.red('❌ There were errors while running stylelint.'));

      // Results are grouped per file, inside of a warnings array
      results.forEach(({ source, warnings, invalidOptionWarnings }) => {
        const filePath = source.replace(ROOT_PATH, '');

        // invalidOptionWarnings contains all stylelint configuration errors
        invalidOptionWarnings.forEach(({ text }) => {
          console.log(chalk.yellow(text));
        });

        // warnings contains all code lines in the business logic
        // that are not compliant with the stylelint configuration (errors and warnings)
        warnings.forEach(({ line, column, severity, text }) => {
          const message = `${filePath}:${line}:${column}: ${text} [${severity}]`;
          console.log(severity === 'error' ? chalk.red(message) : chalk.yellow(message));
        });
      });

      console.log();
      process.exit(1);
    } else {
      console.log();
      process.exit(0);
    }
  } catch (error) {
    console.log();
    console.error(chalk.red('❌ There was a compilation error while running stylelint. Please fix it and try again'));
    console.error(chalk.red(error));
    process.exit(1);
  }
}());
