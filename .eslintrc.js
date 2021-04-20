module.exports = {
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    // 'plugin:jsx-a11y/recommended', // Don't uncomment until you're ready to fix some stuff
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended"
  ],
  plugins: ["prettier"],
  parser: "@babel/eslint-parser",
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
    "react/prop-types": 0,
    "no-unused-vars": 0, // disabled due to false positives
    "no-async-promise-executor": 0, // grandfathered in during eslint update; would be nice to remove
    "no-prototype-builtins": 0, // grandfathered in during eslint update; would be nice to remove
    // React hook settings for future use if required (helpful during some debug sessions)
    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",
    // Added to allow an update to prettier 2.x.x without actually making anything pretty
    "prettier/prettier": [
      "error",
      {
        trailingComma: "none",
        arrowParens: "avoid",
        endOfLine: "auto"
      }
    ]
  },
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      version: "detect" // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { property: "freeze", object: "Object" },
      { property: "myFavoriteWrapper" }
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { name: "Link", linkAttribute: "to" }
    ]
  }
};
