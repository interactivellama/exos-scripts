module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint-config-airbnb",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    "no-prototype-builtins": "off",
    "object-curly-newline": ["error", {
      "ObjectExpression": { "multiline": true, "consistent": true },
      "ObjectPattern": { "multiline": true, "consistent": true },
      "ImportDeclaration": { "multiline": true, "consistent": true },
      "ExportDeclaration": { "multiline": true, "consistent": true }
    }],
  },
};
