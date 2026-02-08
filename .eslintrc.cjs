module.exports = {
    root: true,
    env: {
        browser: true,
        node: false,
        es6: true,
    },
    globals: {
        process: "readonly",
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: { jsx: true },
    },
    plugins: ["react", "react-hooks", "unused-imports", "import"],
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
    ],
    settings: {
        react: { version: "detect" },
    },
    ignorePatterns: ["public", ".cache", "node_modules"],
    rules: {
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "import/order": ["warn", { "newlines-between": "always" }]
    },
    overrides: [
        {
            files: [
                "gatsby-*.js",
                "gatsby-config.js",
                "gatsby-node.js",
                "gatsby-browser.js",
                "gatsby-ssr.js",
                "netlify/functions/**/*.js",
            ],
            env: { node: true, browser: false, es6: true },
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module",
            },
        },
    ],
}
