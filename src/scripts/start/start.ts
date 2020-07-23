#!/usr/bin/env node

import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import webpackConfig from "../../webpack/webpack.config";
import getConfigToUse from "../../common/getConfigToUse";
import { ExosScripts } from "../../common/types";
import getArgumentValue from "../../common/getArgumentValue";

const storybook = require("@storybook/react/standalone");

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "dev";
}

const configToUse = getConfigToUse<webpack.Configuration>(ExosScripts.start, webpackConfig);
console.log(configToUse !== webpackConfig ? "Found custom start config" : "Using default start config");

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(configToUse);
const devServer = new WebpackDevServer(compiler, configToUse.devServer);
const port = configToUse.devServer?.port || 8080;
const host = configToUse.devServer?.host || "0.0.0.0";

const isUILibrary = getArgumentValue(process.argv, "type").toLowerCase() === "uilibrary";

if (isUILibrary) {
  storybook({
    mode: "dev",
    port: port,
    host: host,
    configDir: `${__dirname}/storybook`,
  });
} else {
  devServer.listen(port, host, (error?: Error) => {
    if (error) {
      console.log("❌ There was an error during start.");
      console.log();
      console.log(error);
    }
  });
}
