module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
        ecmaVersion: "latest",
    },
    plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort"],
    extends: [
        "eslint:recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
        "prettier",
        "plugin:prettier/recommended",
    ],
    root: true,
    env: { node: true, jest: true },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
    overrides: [
        {
            files: ["*.entity.ts"],
            rules: { "max-classes-per-file": ["error", 2] },
        },
    ],
    settings: { "import/resolver": { typescript: true, node: true } },
};
