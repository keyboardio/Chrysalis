import js from "@eslint/js";
import globals from "globals";
import babelParser from "@babel/eslint-parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import editorConfigPlugin from "eslint-plugin-editorconfig";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
      editorconfig: editorConfigPlugin,
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 2017,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        MAIN_WINDOW_WEBPACK_ENTRY: true,
        MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: true,
      },
    },
    settings: {
      "import/resolver": {
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".d.ts", ".tsx"],
        },
        webpack: { config: "./config/webpack.dev.js" },
      },
      react: {
        pragma: "React",
        version: "detect",
      },
      propWrapperFunctions: [
        "forbidExtraProps",
        { property: "freeze", object: "Object" },
        { property: "myFavoriteWrapper" },
      ],
      linkComponents: ["Hyperlink", { name: "Link", linkAttribute: "to" }],
    },
    rules: {
      "no-console": 0,
      "react/prop-types": 0,
      "no-unused-vars": 0, // disabled due to false positives
      "no-async-promise-executor": 0, // grandfathered in during eslint update
      "no-prototype-builtins": 0, // grandfathered in during eslint update
      "prefer-const": "error",
      "react-hooks/rules-of-hooks": "error",
      "prettier/prettier": "error",
    },
  },
];
