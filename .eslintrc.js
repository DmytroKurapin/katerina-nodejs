module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2017
  },
  rules: {
    'prettier/prettier': 'error',
    'max-len': ['error', 120],
    'func-names': 'off',
    'default-case': 'off',
    'global-require': 0,
    'import/first': 0,
    'no-param-reassign': 0,
    'no-multi-assign': 0,
    'import/extensions': 'off',
    'no-plusplus': 'off',
    // allow debugger during development
    'import/no-extraneous-dependencies': 'off',
    'object-curly-newline': 'off',
    'consistent-return': 'off',
    'import/no-unresolved': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'space-before-function-paren': 'off',
    'no-mixed-operators': 'off',
    'function-paren-newline': 'off',
    indent: 'off',
    'arrow-body-style': 'off',
    'no-new': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    semi: [2, 'always']
  }
};
