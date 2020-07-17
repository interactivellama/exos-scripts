#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "test";
}

import * as jest from "jest";
import getArgumentValue from "../../common/getArgumentValue";
import getConfigToUse from "../../common/getConfigToUse";
import jestConfigReact = require("./jest.config.react");
import jestConfigLibrary = require("./jest.config.library");
import type { Config } from "@jest/types";

// Choose which default configuration to use
const isLibrary = getArgumentValue(process.argv, "type").toLowerCase() === "library";
const jestConfig = isLibrary ? jestConfigLibrary : jestConfigReact;

// Get config path (default or custom)
const configToUse = getConfigToUse<Config.Argv>("test.js", jestConfig as any);
console.log(configToUse.isCustom ? `Found custom test config at ${configToUse.customPath}` : "Using default test config");

// Remove current args because we don't want to run Jest
// using the current path as base (it should use what's configured in the config file)
const argv = process.argv.slice(2);

// Set the config to use
argv.push("--config", JSON.stringify(configToUse.result));

// Run Jest with the arguments
jest.run(argv);
