import type { RulesetResult } from "./types";

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
  const filesArgument = process.argv.find((item) => item.startsWith("--files"));

  if (filesArgument === undefined) {
    return { result: defaultValue, isCustom: false };
  }

  return { isCustom: true, customPath: filesArg, result: filesArgument.substring("--files=".length).split(",") };
}

export default getFilesToUse;
