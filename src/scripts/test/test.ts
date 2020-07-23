#!/usr/bin/env node

import * as jest from 'jest';
import type { Config } from '@jest/types';
import getArgumentValue from '../../common/getArgumentValue';
import getConfigToUse from '../../common/getConfigToUse';
import { ExosScripts } from '../../common/types';

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'test';
}
import jestConfigReact = require('./jest.config.react');
import jestConfigLibrary = require('./jest.config.library');

// Choose which default configuration to use
const isLibrary = getArgumentValue(process.argv, 'type').toLowerCase() === 'library';
const jestConfig: Config.InitialOptions = isLibrary ? jestConfigLibrary : jestConfigReact;

// Get config path (default or custom)
const configToUse = getConfigToUse<Config.InitialOptions>(ExosScripts.test, jestConfig);
console.log(configToUse !== jestConfig ? 'Found custom test config' : 'Using default test config');

// Remove current args because we don't want to run Jest
// using the current path as base (it should use what's configured in the config file)
const argv = process.argv.slice(2);

// Set the config to use
argv.push('--config', JSON.stringify(configToUse));

// Run Jest with the arguments
jest.run(argv);
