const exosWebpack = require("../webpack/webpack.config.uilibrary").default;

module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: ["@storybook/addon-actions", "@storybook/addon-knobs", "@storybook/addon-a11y", "@storybook/addon-docs"],
  webpackFinal: (config) => {
    config.resolve = exosWebpack.resolve;
    return config;
  },
};
