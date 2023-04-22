module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  ignorePatterns: ['.eslintrc.js', 'src/migration'],
  rules: {
    camelcase: "on",
    "import/no-unresolved": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface",
        format: ["PascalCase"],
        custom: {
          regex: "^I[A-Z]",
          match: true
        }
      },
      {
        selector: "class",
        format: ["PascalCase"],
      }
    ],
    "import-helpers/order-imports": [
      "warn",
      {
        newlinesBetween: "always",
        groups: ["module", "/^@shared/", ["parent", "sibling", "index"]],
        alphabetize: { "order": "asc", "ignoreCase": true }
      }
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["**/*.spec.js"] }
    ],
    "prettier/prettier": "error"
  },
  settings: {
    "import/resolver": {
      typescript: {}
    }
  }
};
