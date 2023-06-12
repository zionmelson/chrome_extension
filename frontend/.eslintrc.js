module.exports = {
    env: {
      browser: true,
      es6: true,
      webextensions: true
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended"
    ],
    globals: {
      chrome: "readonly"
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2020,
      sourceType: "module"
    },
    plugins: [
      "react"
    ],
    rules: {
      // Add any specific ESLint rules you want to enforce
    }
  };
  