#!/usr/bin/env node
import chalk from "chalk";
import path from "path";
import { SOURCE_PATH } from "../../common/paths";
import getConfigToUse from "../../common/getConfigToUse";
import getFilesToUse from "../../common/getFilesToUse";
import { ESLint } from "eslint";
import eslintrcReact = require("./.eslintrc.react");
import eslintrcLibrary = require("./.eslintrc.library");

// Choose which default configuration to use
const isLibrary = process.argv.find((item) => item === "--type=library") !== null;
const eslintrc = isLibrary ? eslintrcLibrary : eslintrcReact;

// Resolve configuration to use
const configToUse = getConfigToUse<{}>("lint.js", eslintrc);
console.log(configToUse.isCustom ? `Found custom lint at ${configToUse.customPath}` : "Using default lint config");

// Resolve files to use
const filesToUse = getFilesToUse("--files=", [path.join(SOURCE_PATH, "/**/*.{ts,tsx}")]);
console.log(filesToUse.isCustom ? `Found custom rule to identify files to use: ${filesToUse.result}` : "Using default rule to identify files");

async function main() {
  const hasFixFlag = process.argv.indexOf("--fix") !== -1;

  // Create an instance with the `fix` option.
  const eslint = new ESLint({
    baseConfig: configToUse.result,
    fix: hasFixFlag,
    useEslintrc: false,
  });

  try {
    // Lint files and get the lint result
    const results = await eslint.lintFiles(filesToUse.result);

    // If "--fix" is provided, modify the files with the fixed code
    if (hasFixFlag) {
      await ESLint.outputFixes(results);
    }

    // ESLint results is a collection of individual results (one per file)
    // Generate a global results object containing the error count of each individual file
    const globalResults = results.reduce(
      (globalAcc, result) => {
        globalAcc.errorCount += result.errorCount;
        globalAcc.warningCount += result.warningCount;
        return globalAcc;
      },
      { errorCount: 0, warningCount: 0 }
    );

    // Format the (global) results and output them
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    console.log(resultText);

    // Exit the process based on the (global) results
    const hasErrorsOrWarnings = globalResults.errorCount > 0 || globalResults.warningCount > 0;
    process.exit(hasErrorsOrWarnings ? 1 : 0);
  } catch (error) {
    // eslint.lintFiles could throw errors
    // See https://eslint.org/docs/developer-guide/nodejs-api#%E2%97%86-new-eslint-options
    console.error(chalk.red("❌ There was an error while running lint. Please fix it and try again"));
    console.error(error);
    process.exit(1);
  }
}

main();
