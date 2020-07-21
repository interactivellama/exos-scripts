module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint-config-airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    'react/sort-comp': ['error', {
      order: [
        'type-annotations',
        'static-variables',
        'static-methods',
        'getters',
        'setters',
        'lifecycle',
        'everything-else',
        'render',
      ],
    }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'import/extensions': ['error', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'ignore',
    }],
    'no-prototype-builtins': 'off',
    'max-len': ['error', { code: 120, tabWidth: 2, ignoreUrls: true, ignoreStrings: true, ignoreRegExpLiterals: true }],
    'prefer-destructuring': ['error', { object: true, array: false }],
    'object-curly-newline': ['error', {
      ObjectExpression: { multiline: true, consistent: true },
      ObjectPattern: { multiline: true, consistent: true },
      ImportDeclaration: { multiline: true, consistent: true },
      ExportDeclaration: { multiline: true, consistent: true },
    }],
    'quote-props': ['error', 'consistent-as-needed'],
  },
};
