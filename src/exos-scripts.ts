#! /usr/bin/env node
import build from "./scripts/build";
import start from "./scripts/start";
import lint from "./scripts/lint";
import test from "./scripts/test";
import { scripts } from './scripts/types';

async function init(scriptName: string, scriptArguments: string[], availableScripts: scripts) {
  const scriptToExecute = availableScripts.hasOwnProperty(scriptName);

  if (!scriptToExecute) {
    console.error(`Script ${scriptName} doesn't exist.`);
    console.error(`Valid scripts are: ${Object.keys(availableScripts).join(", ")}.`);
    console.log();
    return;
  }
  console.log(`Executing script ${scriptName}...`);
  await availableScripts[scriptName](scriptArguments)
  console.log();
}

const availableScripts = {
  "build": build,
  "start": start,
  "lint": lint,
  "test": test
};
const script = process.argv[2];
const otherArgs = process.argv.slice(3);

init(script, otherArgs, availableScripts);
