/** Exos Scripts names */
export enum ExosScripts {
  'start' = 'start',
  'build' = 'build',
  'lint' = 'lint',
  'stylelint' = 'stylelint',
  'test' = 'test',
}

/** Configuration function of the scripts */
type ExosScriptConfigFn<T> = (defaultConfig: T, envVariables: { env?: string }) => T;

/**
 * Exos configuration file
 */
export interface ExosConfig {
  /** Custom configuration for the scripts */
  scripts: {
    /** Configuration function for the lint script */
    lint: ExosScriptConfigFn<{}>;
    /** Configuration function for the stylelint script */
    stylelint: ExosScriptConfigFn<{}>;
    /** Configuration function for the start script */
    start: ExosScriptConfigFn<{}>;
    /** Configuration function for the build script */
    build: ExosScriptConfigFn<{}>;
    /** Configuration function for the test script */
    test: ExosScriptConfigFn<{}>;
  };
}
