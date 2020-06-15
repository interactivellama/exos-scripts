#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "test";
}

import * as jest from "jest";
import getConfigToUse from "../../common/getConfigToUse";
import jestConfigReact = require("./jest.config.react");
import jestConfigLibrary = require("./jest.config.library");
import type { Config } from "@jest/types";

// Choose which default configuration to use
const isLibrary = process.argv.find((item) => item === "--type=library") !== null;
const jestConfig = isLibrary ? jestConfigLibrary : jestConfigReact;

// Get config path (default or custom)
const configToUse = getConfigToUse<Config.Argv>("test.js", jestConfig as any);
console.info(configToUse.isCustom ? `Found custom test config at ${configToUse.customConfigPath}` : "Using default test config");

// Remove current args because we don't want to run Jest
// using the current path as base (it should use what's configured in the config file)
const argv = process.argv.slice(2);

// Set the config to use
argv.push("--config", JSON.stringify(configToUse.config));

// Run Jest with the arguments
jest.run(argv);
