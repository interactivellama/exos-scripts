const exosWebpack = require('../../../webpack/webpack.config.storybook').default;

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-a11y', '@storybook/addon-docs'],
  webpackFinal: (config) => {
    const exosConfig = {
      ...config,
      resolve: exosWebpack.resolve,
    };
    return exosConfig;
  },
};
