import path from 'path';

const exosStorybookWebpack = require('../../../webpack/webpack.config.storybook').default;

module.exports = {
  stories: [path.resolve('./src')],
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-a11y', '@storybook/addon-docs'],
  webpackFinal: (config) => {
    const configuration = { ...config };
    configuration.resolve = exosStorybookWebpack.resolve;
    configuration.module.rules = [...configuration.module.rules, ...exosStorybookWebpack.module.rules];
    return configuration;
  },
};
