#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "dev";
}

// eslint-disable-next-line
const storybook = require("@storybook/react/standalone");

import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";
import webpackConfig from "../../webpack/webpack.config";
import getConfigToUse from "../../common/getConfigToUse";
import getArgumentValue from "../../common/getArgumentValue";

const isUILibrary = getArgumentValue(process.argv, "type").toLowerCase() === "uilibrary";

const configToUse = getConfigToUse<webpack.Configuration>("start.js", webpackConfig);
console.log(configToUse.isCustom ? `Found custom start config at ${configToUse.customPath}` : "Using default start config");

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(configToUse.result);
const devServer = new webpackDevServer(compiler, configToUse.result.devServer);
const port = configToUse.result.devServer?.port || 8080;
const host = configToUse.result.devServer?.host || "0.0.0.0";

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
      return;
    }
  });
}
