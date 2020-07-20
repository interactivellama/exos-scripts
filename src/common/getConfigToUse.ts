import fs from "fs";
import path from "path";
import { CONFIG_PATH } from "./paths";
import type { ExosConfig, ExosScripts } from "../common/types";

/**
 * Retrieves the configuration to use.
 * @param scriptName The script name
 * @param defaultConfig The default config to use
 * @returns
 * If there is a custom configuration, we will call this file and send the default config.
 * Otherwise, we will simply return the default one.
 */
function getConfigToUse<T>(scriptName: ExosScripts, defaultConfig: T): T {
  const exosConfigPath: string = path.resolve(CONFIG_PATH);
  const exosConfigPathExists: boolean = fs.existsSync(exosConfigPath);

  if (!exosConfigPathExists) {
    return defaultConfig;
  }

  const exosConfig = require(exosConfigPath) as ExosConfig;
  const exosScriptCustomConfig = exosConfig.scripts && exosConfig.scripts[scriptName];

  if (!exosScriptCustomConfig) {
    return defaultConfig;
  }

  return exosScriptCustomConfig(defaultConfig, { env: process.env.NODE_ENV }) as T;
}

export default getConfigToUse;
