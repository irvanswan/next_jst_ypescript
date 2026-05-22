import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: ["node_modules/**", ".next/**", "dist/**", "out/**", "coverage/**"]
  },
  ...nextVitals,
  ...nextTs
];

export default eslintConfig;
