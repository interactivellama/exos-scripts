import type { RulesetResult } from "./types";
import getArgumentValue from "./getArgumentValue";

/**
 * Retrieves the files to use.
 * @param configFileName The config file name
 * @param defaultConfig The default config to use
 * @returns
 * If there is a custom configuration, we will call this file and send the default config.
 * Otherwise, we will simply return the default one.
 */
function getFilesToUse(filesArg: string, defaultValue: string[]): RulesetResult<string[]> {
  // Check if the --files="globPattern1","globPattern2" argument is present
  // If it is, use it to identify the files to test against
  const filesArgument = getArgumentValue(process.argv, "files");

  if (!filesArgument) {
    return { result: defaultValue, isCustom: false };
  }

  return { isCustom: true, customPath: filesArg, result: filesArgument.split(",") };
}

export default getFilesToUse;
