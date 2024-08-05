module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    'no-useless-escape': 'off',
    '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    'indent': 'off'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    module: true
  },
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'htmlacademy/node'
  ]
};
