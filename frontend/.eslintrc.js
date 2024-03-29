module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-unused-expressions': 'off',
    'prettier/prettier': 0,
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx', '.jsx'] }],
    '@typescript-eslint/no-unused-vars': ['warn'],
    'no-unused-vars': 'off',
    'react/function-component-definition': [
      2,
      { namedComponents: ['arrow-function', 'function-declaration'] },
    ],
    'no-use-before-define': 'off', // style err fixed
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ], // Missing file extension "ts" for "./lib/env" import/extensions err fixed
    'react/no-unstable-nested-components': ['off'], // nested components err fixed
    'global-require': 0, // require err fixed
    '@typescript-eslint/no-explicit-any': ['off'], // any err fixed
    'import/prefer-default-export': 'off', // export err fixed
    'no-console': 'off', // console err fixed
    'react/jsx-no-useless-fragment': 'off', // 불필요한 fragment 금지
    'react/require-default-props': 0,
    'no-plusplus': 'off',
    'react-native/no-inline-styles': 0,
    'no-nested-ternary': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-unneeded-ternary': 'off',
    'object-shorthand': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'prefer-destructuring': 'off',
    'no-underscore-dangle': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'prefer-template': 'off',
    'import/order': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    'import/core-modules': [
      'react-hook-form',
      'react-native-bouncy-checkbox',
      '@react-navigation/stack',
      '@react-native-async-storage/async-storage',
    ], //import/no-extraneous-dependencies 에러 해결
  },
};
