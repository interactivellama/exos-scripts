module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint-config-airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'react/function-component-definition': ['error', { namedComponents: 'function-declaration' }],
    'react/no-multi-comp': 'error',
    'react/sort-prop-types': ['error', {
      callbacksLast: true,
      requiredFirst: true,
      noSortAlphabetically: true,
    }],
    'react/jsx-handler-names': ['error', {
      eventHandlerPrefix: 'handle',
      eventHandlerPropPrefix: 'on',
    }],
    'react/jsx-max-props-per-line': ['error', {
      maximum: 1,
      when: 'always',
    }],
    'react/jsx-no-bind': ['error', {
      ignoreRefs: true,
      allowArrowFunctions: false,
      allowFunctions: false,
      allowBind: false,
      ignoreDOMComponents: false,
    }],
    'import/no-extraneous-dependencies': ['off'],
    'import/extensions': ['error', {
      js: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'func-names': ['error', 'always'],
    'func-style': ['error', 'declaration'],
    'no-prototype-builtins': 'off',
    'object-curly-newline': ['error', {
      ObjectExpression: {
        multiline: true,
        consistent: true,
      },
      ObjectPattern: {
        multiline: true,
        consistent: true,
      },
      ImportDeclaration: {
        multiline: true,
        consistent: true,
      },
      ExportDeclaration: {
        multiline: true,
        consistent: true,
      },
    }],
  },
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['*.stories.*'],
      rules: {
        'react/no-multi-comp': 'off',
        'react/jsx-no-bind': 'off',
      },
    },
    {
      files: ['*.container.*'],
      rules: {
        'react/jsx-handler-names': 'off',
      },
    },
  ],
};
