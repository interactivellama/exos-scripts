/**
 * Result of a check to use either a default ruleset
 * or a custom ruleset sent via process.args
 */
export interface RulesetResult<T> {
  /** The result of the rule check */
  result: T;
  /** True if the resolved ruleset is custom. False if it is the default */
  isCustom: boolean;
  /** The path of the custom ruleset to use */
  customPath?: string;
}
