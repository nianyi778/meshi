import pluginReactHooks from "eslint-plugin-react-hooks";
import baseConfig from "./base.js";

/** @type {import("typescript-eslint").Config} */
export default [
  ...baseConfig,
  {
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
    },
  },
];
