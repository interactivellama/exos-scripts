import path from "path";
import resolveExternals from "./resolveExternals";
import resolveModuleRules from "./resolveModuleRules";
import resolvePlugins from "./resolvePlugins";
import resolveVersion from "./resolveVersion";
import { ROOT_PATH, OUTPUT_PATH } from "../common/paths";
import type webpack from "webpack";

const isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "dev";
const version = resolveVersion(isDevelopment);

const webpackConfig: webpack.Configuration = {
  mode: isDevelopment ? "development" : "production",

  entry: path.resolve(ROOT_PATH, "./src/index.tsx"),
  output: {
    filename: "index.min.js",
    path: OUTPUT_PATH,
  },

  // See https://webpack.js.org/configuration/devtool/
  devtool: isDevelopment ? "cheap-module-eval-source-map" : "source-map",

  resolve: {
    // Add resolvable extensions.
    extensions: [".ts", ".tsx", ".scss", ".js", ".jsx", ".json"],
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: resolveExternals(isDevelopment, true),

  module: {
    rules: resolveModuleRules(isDevelopment),
  },

  plugins: resolvePlugins(isDevelopment, version),
};

export default webpackConfig;
