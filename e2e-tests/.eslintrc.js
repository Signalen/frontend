// SPDX-License-Identifier: MPL-2.0
// Copyright (C) 2020 - 2021 Gemeente Amsterdam
module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:cypress/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:promise/recommended',
    'plugin:redux-saga/recommended',
    'plugin:testing-library/react',
    'prettier',
    'prettier/react',
  ],
  globals: {
    L: true,
  },
  overrides: [
    {
      files: ['**/*.test.*'],
      rules: {
        'no-import-assign': 'off',
        'react/display-name': 'off',
        'redux-saga/no-unhandled-errors': 'off',
      },
    },
    {
      extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
      ],
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
          },
        ],
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['import'],
  root: true,
  rules: {
    'import/first': 'error',
    'import/order': 'error',
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    'jsx-a11y/aria-role': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'no-undef': 'off',
    'promise/always-return': 'off',
    'promise/catch-or-return': 'off',
    'promise/no-callback-in-promise': 'off',
    'react/display-name': 'off',
    'react/jsx-key': 'off',
    'react/prop-types': 'off',
    'redux-saga/no-unhandled-errors': 'off',
    'require-yield': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
