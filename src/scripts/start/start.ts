#!/usr/bin/env node

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'dev';
}

// We need to set up process.env.NODE_ENV because
// the imported files will use this value
/* eslint-disable import/first */
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../../webpack/webpack.config';
import getConfigToUse from '../../common/getConfigToUse';
import { ExosScripts } from '../../common/types';

const configToUse = getConfigToUse<webpack.Configuration>(ExosScripts.start, webpackConfig);
console.log(configToUse !== webpackConfig ? 'Found custom start config' : 'Using default start config');

// For more information, see https://webpack.js.org/api/node/
const compiler = webpack(configToUse);
const devServer = new WebpackDevServer(compiler, configToUse.devServer);
const port = configToUse.devServer?.port || 8080;
const host = configToUse.devServer?.host || '0.0.0.0';

devServer.listen(port, host, (error?: Error) => {
  if (error) {
    console.log('❌ There was an error during start.');
    console.log();
    console.log(error);
  }
});
