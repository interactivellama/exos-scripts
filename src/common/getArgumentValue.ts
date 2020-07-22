/**
 * Get the value of a particular argument
 * @param args The collection of arguments (e.g. `["--watchAll=true", "--coverage"]`)
 * @param arg The name of the argument to look for (e.g. `"watchAll"`)
 * @param defaultValue The default value to return if the argument is not present
 * @returns The value of the argument. If the argument is not present, it returns the default value.
 */
function getArgumentValue(args: string[], arg: string, defaultValue = ''): string {
  const argument = args.find((item) => item.startsWith(`--${arg}`));

  // Cover arguments that are booleans and doesn't have a value (e.g. "--coverage")
  if (argument?.endsWith(arg)) {
    return 'true';
  }

  // Cover arguments that have a value (e.g. "--maxWarnings=3" but also "--maxWarnings 3")
  return argument?.substring(`--${arg}=`.length) || defaultValue;
}

export default getArgumentValue;
