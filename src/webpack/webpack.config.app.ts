import path from 'path';
import type webpack from 'webpack';
import {
  ROOT_PATH,
  OUTPUT_PATH,
  OUTPUT_PUBLIC_PATH,
} from '../common/paths';
import resolveAliases from './resolveAliases';
import resolveExternals from './resolveExternals';
import resolveModuleRules from './resolveModuleRules';
import resolvePlugins from './resolvePlugins';
import resolveVersion from './resolveVersion';

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';
const version = resolveVersion(isDevelopment);

const webpackConfig: webpack.Configuration = {
  devServer: isDevelopment
    ? {
      https: true,
      inline: true,
      hot: true,
      contentBase: [OUTPUT_PATH, ROOT_PATH],
      publicPath: OUTPUT_PUBLIC_PATH,
      historyApiFallback: true,
    }
    : undefined,

  // See https://webpack.js.org/configuration/devtool/
  devtool: isDevelopment ? 'cheap-module-eval-source-map' : 'source-map',

  externals: resolveExternals(false),

  mode: isDevelopment ? 'development' : 'production',

  entry: path.resolve(ROOT_PATH, './src/index.tsx'),

  output: {
    filename: 'bundle.[hash:5].min.js',
    path: OUTPUT_PATH,
    publicPath: OUTPUT_PUBLIC_PATH,
  },

  resolve: {
    alias: resolveAliases(),
    extensions: ['.ts', '.tsx', '.scss', '.js', '.jsx', '.json'],
  },

  module: {
    rules: resolveModuleRules(isDevelopment, false),
  },

  plugins: resolvePlugins(isDevelopment, false, version),
};

export default webpackConfig;
