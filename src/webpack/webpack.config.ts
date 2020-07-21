import type webpack from 'webpack';
import webpackConfigApp from './webpack.config.app';
import webpackConfigLibrary from './webpack.config.library';

// TODO: move this to the main file and convert the webpack to a function
import getArgumentValue from '../common/getArgumentValue';

const isLibrary = getArgumentValue(process.argv, 'type').toLowerCase() === 'library';

const config: webpack.Configuration = isLibrary ? webpackConfigLibrary : webpackConfigApp;
export default config;
