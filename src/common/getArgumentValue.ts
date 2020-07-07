/**
 * Get the value of a particular argument
 * @param args The collection of arguments (e.g. `["--watchAll=true", "--coverage"]`)
 * @param arg The argument to look for (e.g. `"--watchAll"`)
 * @returns The argument value or the default argument value
 */
function getArgumentValue(args: string[], arg: string, defaultArgument = ""): string {
  const argument = args.find((item) => item.startsWith(`--${arg}`));

  // Cover arguments that are booleans and doesn't have a value (e.g. "--coverage")
  if (argument?.endsWith(arg)) {
    return "true";
  }

  // Cover arguments that have a value (e.g. "--maxWarnings=3" but also "--maxWarnings 3")
  return argument?.substring(`--${arg}=`.length) || defaultArgument;
}

export default getArgumentValue;
