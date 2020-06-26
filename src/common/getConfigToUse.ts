import fs from "fs";
import path from "path";
import { CONFIG_PATH } from "./paths";
import type { RulesetResult } from "./types";

/**
 * Retrieves the configuration to use.
 * @param configFileName The config file name
 * @param defaultConfig The default config to use
 * @returns
 * If there is a custom configuration, we will call this file and send the default config.
 * Otherwise, we will simply return the default one.
 */
function getConfigToUse<T>(configFileName: string, defaultConfig: T): RulesetResult<T> {
  const customConfigPath: string = path.resolve(CONFIG_PATH, configFileName);
  const customConfigExists: boolean = fs.existsSync(customConfigPath);

  if (!customConfigExists) {
    return { result: defaultConfig, isCustom: false };
  }

  // We need to require this dynamically as the command is chosen by the user
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const customConfig = require(customConfigPath)(defaultConfig, { env: process.env.NODE_ENV });
  return { isCustom: true, result: customConfig, customPath: customConfigPath };
}

export default getConfigToUse;
