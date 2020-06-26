import spawn from "cross-spawn";
import path from "path";
import type { SpawnSyncReturns } from "child_process";

const EXOS_SCRIPT_PATH = path.resolve(process.cwd(), "./lib/index.js");

function runScript(scriptPath: string, args: string[]): SpawnSyncReturns<string> {
  return spawn.sync("node", [scriptPath, ...args], { encoding: "utf8" });
}

function runExosScript(args: string[]): SpawnSyncReturns<string> {
  return runScript(EXOS_SCRIPT_PATH, args);
}

export { runExosScript };
