module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    // 'plugin:jsx-a11y/recommended', // Don't uncomment until you're ready to fix some stuff
    "plugin:prettier/recommended"
  ],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  globals: {
    __static: true
  },
  rules: {
    "no-console": 0,
    "react/prop-types": 0
  }
};
