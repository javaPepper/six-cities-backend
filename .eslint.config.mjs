module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: module
  },
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
     "plugin:@typescript-eslint/recommended",
     "htmlacademy/node"
  ]
}
