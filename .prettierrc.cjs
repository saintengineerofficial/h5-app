/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 150,
  bracketSpacing: true,
  endOfLine: "auto",
  singleQuote: false,
  semi: false,
  tabWidth: 2,
  trailingComma: "es5",
  wrap_line_length: 120,
  wrap_attributes: "auto",
  proseWrap: "always",
  arrowParens: "avoid",
  jsxBracketSameLine: true,
  useTabs: false,
  eslintIntegration: true,
  htmlWhitespaceSensitivity: "ignore",
  plugins: ["prettier-plugin-tailwindcss"],
};
