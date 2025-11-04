import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import next from "eslint-config-next";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "prettier/prettier": ["warn"],
    },
  },
  ...next,
];
