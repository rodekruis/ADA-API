module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    plugins: ["@typescript-eslint/eslint-plugin"],
    extends: [
        "airbnb-base",
        "airbnb-typescript/base",
        "prettier",
        "plugin:prettier/recommended",
    ],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
    overrides: [
        {
            files: ["*.entity.ts"],
            rules: {
                "max-classes-per-file": ["error", 2],
            },
        },
    ],
};
