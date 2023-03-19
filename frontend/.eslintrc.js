module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "plugin:storybook/recommended"],
  "overrides": [
    {
      "files": [
        "**/*.test.js",
        "**/*.test.jsx"
      ],
      "env": {
        "jest": true
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "indent": [2, "tab"],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "react/prop-types": 0
  }
};