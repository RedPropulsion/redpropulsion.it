import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  eslintConfigPrettier,
];

export default eslintConfig;
