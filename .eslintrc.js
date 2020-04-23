module.exports = {
  extends: ['elv1n-react'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    // replaced with typescript
    'react/prop-types': 'off',
    // don't like it anymore
    'react/destructuring-assignment': 'off',
    // temp before release
    // leave it for prettier
    'comma-dangle': 'off',
    // temp before release
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        arrowParens: 'avoid',
      },
    ],
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        mjs: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
};
