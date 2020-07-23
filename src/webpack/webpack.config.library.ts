import path from 'path';
import type webpack from 'webpack';
import { ROOT_PATH, OUTPUT_PATH } from '../common/paths';
import resolveAliases from './resolveAliases';
import resolveExternals from './resolveExternals';
import resolveModuleRules from './resolveModuleRules';
import resolvePlugins from './resolvePlugins';
import resolveVersion from './resolveVersion';

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';
const version = resolveVersion(isDevelopment);

const webpackConfig: webpack.Configuration = {
  // See https://webpack.js.org/configuration/devtool/
  devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',

  externals: resolveExternals(true),

  mode: isDevelopment ? 'development' : 'production',

  entry: path.resolve(ROOT_PATH, './src/index.tsx'),

  output: {
    filename: 'index.min.js',
    path: OUTPUT_PATH,
    libraryTarget: 'commonjs2',
  },

  resolve: {
    alias: resolveAliases(),
    extensions: ['.ts', '.tsx', '.scss', '.js', '.jsx', '.json'],
  },

  module: {
    rules: resolveModuleRules(isDevelopment, true),
  },

  plugins: resolvePlugins(isDevelopment, true, version),
};

export default webpackConfig;
