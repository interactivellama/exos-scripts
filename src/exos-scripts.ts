import chalk from 'chalk';
import path from 'path';
import spawn from 'cross-spawn';
import { ExosScripts } from './common/types';

export default function exosScripts(scriptName: string, args: string[]): void {
  if (!(scriptName in ExosScripts)) {
    console.log(chalk.red(`Script ${scriptName} doesn't exist.`));
    console.log(chalk.red(`Valid scripts are: ${Object.keys(ExosScripts).join(', ')}.`));
    console.log();
    return;
  }

  console.log(`Executing script ${scriptName}...`);
  console.log();

  const scriptPath = require.resolve(path.resolve(__dirname, 'scripts', `${scriptName}/${scriptName}`));
  const result = spawn.sync('node', [scriptPath, ...args], { stdio: 'inherit' });

  process.exit(result.status || undefined);
}
