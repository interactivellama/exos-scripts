import path from 'path';

import type webpack from 'webpack';
import resolveAliases from './resolveAliases';
import resolveModuleRules from './resolveModuleRules';

const isDevelopment = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'dev';

// eslint-disable-next-line
const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

const storybookRules: webpack.RuleSetRule[] = [
  {
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: 'babel-loader',
        // may or may not need this line depending on your app's setup
        options: {
          plugins: ['@babel/plugin-transform-react-jsx'],
        },
      },
      {
        loader: '@mdx-js/loader',
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  },
  {
    test: /\.(stories|story)\.tsx?$/,
    loader: require.resolve('@storybook/source-loader'),
    exclude: [/node_modules/],
    enforce: 'pre',
  },
  {
    test: /\.tsx?$/,
    include: path.resolve(__dirname, '../src'),
    use: [
      {
        loader: require.resolve('react-docgen-typescript-loader'),
        options: {
          // Provide the path to your tsconfig.json so that your stories can
          // display types from outside each individual story.
          tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
        },
      },
    ],
  },
];

const webpackConfig: webpack.Configuration = {
  resolve: {
    alias: resolveAliases(),
    extensions: ['.ts', '.tsx', '.scss', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [...resolveModuleRules(isDevelopment, true), ...storybookRules],
  },
};

export default webpackConfig;
