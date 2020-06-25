const path = require("path");
const ROOT_PATH = path.resolve(process.cwd());
const SOURCE_PATH = path.resolve(ROOT_PATH, "src");
const TEST_PATH = path.resolve(ROOT_PATH, "test");

module.exports = {
  rootDir: ROOT_PATH,
  roots: [SOURCE_PATH, TEST_PATH],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: !!process.env.CI,
  collectCoverageFrom: ["**/*.{js,jsx,tsx,ts}", "!**/node_modules/**"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|svg)$": path.join(__dirname, "FileMock.js"),
  },
};
