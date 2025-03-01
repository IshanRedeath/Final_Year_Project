import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    rules: {
      "no-console": "off",
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      "no-console": "off",
      "no-unused-vars": "off",
      "no-undef": "error",
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
];
