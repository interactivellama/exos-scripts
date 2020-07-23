/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const ROOT_PATH = path.resolve(process.cwd());

module.exports = {
  rootDir: ROOT_PATH,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupFilesAfterEnv: [path.join(__dirname, 'enzyme.js')],
  testRegex: '^.+\\.(tests?|spec)\\.[jt]sx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: !!process.env.CI, // If the CI environment variable is set, run coverage
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|svg)$': path.join(__dirname, 'FileMock.js'),
  },
};
