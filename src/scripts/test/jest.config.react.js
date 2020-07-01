const path = require("path");

module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: [path.join(__dirname, "enzyme.js")],
  testRegex: "^.+\\.(tests?|spec)\\.[jt]sx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: !!process.env.CI, // If the CI environment variable is set, run coverage
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|svg)$": path.join(__dirname, "FileMock.js"),
  },
};
