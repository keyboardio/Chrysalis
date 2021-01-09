module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "plugin:jsx-a11y/recommended",
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
    "react/prop-types": 0,
    "no-unused-vars": 1,
    "no-async-promise-executor": 0, // grandfathered in during eslint update; would be nice to remove
    "no-prototype-builtins": 0 // grandfathered in during eslint update; would be nice to remove
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
