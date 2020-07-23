import path from "path";

import { ROOT_PATH, OUTPUT_PATH } from "../common/paths";
import resolveAliases from "./resolveAliases";
import resolveExternals from "./resolveExternals";
import resolveModuleRules from "./resolveModuleRules";
import resolvePlugins from "./resolvePlugins";
import resolveVersion from "./resolveVersion";

import type webpack from "webpack";

const isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev";
const version = resolveVersion(isDevelopment);

// eslint-disable-next-line
const createCompiler = require("@storybook/addon-docs/mdx-compiler-plugin");

const storybookRules: webpack.RuleSetRule[] = [
  {
    test: /\.(stories|story)\.mdx$/,
    use: [
      {
        loader: "babel-loader",
        // may or may not need this line depending on your app's setup
        options: {
          plugins: ["@babel/plugin-transform-react-jsx"],
        },
      },
      {
        loader: "@mdx-js/loader",
        options: {
          compilers: [createCompiler({})],
        },
      },
    ],
  },
  {
    test: /\.(stories|story)\.tsx?$/,
    loader: require.resolve("@storybook/source-loader"),
    exclude: [/node_modules/],
    enforce: "pre",
  },
  {
    test: /\.tsx?$/,
    include: path.resolve(__dirname, "../src"),
    use: [
      {
        loader: require.resolve("react-docgen-typescript-loader"),
        options: {
          // Provide the path to your tsconfig.json so that your stories can
          // display types from outside each individual story.
          tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
        },
      },
    ],
  },
];

const webpackConfig: webpack.Configuration = {
  // See https://webpack.js.org/configuration/devtool/
  devtool: isDevelopment ? "cheap-module-eval-source-map" : "source-map",

  externals: resolveExternals(true),

  mode: isDevelopment ? "development" : "production",

  entry: path.resolve(ROOT_PATH, "./src/index.tsx"),

  output: {
    filename: "index.min.js",
    path: OUTPUT_PATH,
    libraryTarget: "commonjs2",
  },

  resolve: {
    alias: resolveAliases(),
    extensions: [".ts", ".tsx", ".scss", ".js", ".jsx", ".json"],
  },

  module: {
    rules: [...resolveModuleRules(isDevelopment, true), ...storybookRules],
  },

  plugins: resolvePlugins(isDevelopment, true, version),
};

export default webpackConfig;
