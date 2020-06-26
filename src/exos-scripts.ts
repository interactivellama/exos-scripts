import chalk from "chalk";
import path from "path";
import spawn from "cross-spawn";

const availableScripts: string[] = ["build", "start", "lint", "test", "stylelint"];

export default function exosScripts(scriptName: string, args: string[]) {
  const isScriptAvailable = availableScripts.find((item) => item.indexOf(scriptName) !== -1) !== undefined;

  if (!isScriptAvailable) {
    console.log(chalk.red(`Script ${scriptName} doesn't exist.`));
    console.log(chalk.red(`Valid scripts are: ${availableScripts.join(", ")}.`));
    console.log();
    return;
  }

  console.log(`Executing script ${scriptName}...`);
  console.log();

  const scriptPath = require.resolve(path.resolve(__dirname, "scripts", `${scriptName}/${scriptName}`));
  const result = spawn.sync("node", [scriptPath, ...args], { stdio: "inherit" });

  process.exit(result.status || undefined);
}
