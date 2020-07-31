import path from 'path';

import getArgumentValue from '../../common/getArgumentValue';

const exosStorybookWebpack = require('../../webpack/webpack.config.storybook').default;

const withPackages = getArgumentValue(process.argv, 'withPackages');
const stories = [path.resolve('./src/**/*.stories.tsx')];

if (withPackages) {
  stories.push(path.resolve('./packages/**/*.stories.tsx'));
}

module.exports = {
  stories,
  addons: ['@storybook/addon-actions', '@storybook/addon-knobs', '@storybook/addon-a11y', '@storybook/addon-docs'],
  webpackFinal: (config) => {
    const configuration = { ...config };
    configuration.resolve = exosStorybookWebpack.resolve;
    configuration.module.rules = [
      ...configuration.module.rules,
      ...exosStorybookWebpack.module.rules,
    ];
    return configuration;
  },
};
