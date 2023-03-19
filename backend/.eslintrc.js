module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  "overrides": [
    {
      "files": [
        "**/*.test.js",
      ],
      "env": {
        "jest": true
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"]
  },
}
