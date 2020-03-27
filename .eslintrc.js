module.exports = {
    plugins: ['prettier', 'promise'],
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        'prettier/prettier': ['error'],
        /**
         * Disallow the use of console
         * https://eslint.org/docs/rules/no-console
         */
        'no-console': 'off',

        /**
         * Disallow Reassignment of Function Parameters
         * https://eslint.org/docs/rules/no-param-reassign
         */
        'no-param-reassign': ['error', { props: false }],

        /**Disallows unnecessary return await
         * https://eslint.org/docs/rules/no-return-await
         */
        'no-return-await': ['error'],
        /**
         * Disallow using an async function as a Promise executor
         * https://eslint.org/docs/rules/no-async-promise-executor
         */
        'no-async-promise-executor': ['error'],
        /**
         * Disallow await inside of loops
         * https://eslint.org/docs/rules/no-await-in-loop
         */
        'no-await-in-loop': ['error'],

        /**
         * Disallow assignments that can lead to race conditions due to
         * usage of await or yield
         * https://eslint.org/docs/rules/require-atomic-updates
         */
        'require-atomic-updates': ['error'],

        /**
         * Disallow async functions which have no await expression
         * https://eslint.org/docs/rules/require-await
         */
        'require-await': ['error'],

        /**
         * Require or disallow named function expressions
         * https://eslint.org/docs/rules/func-names
         */
        'func-names': 'off',
        /**
         * Disallow enforcement of consistent linebreak style
         * https://eslint.org/docs/rules/func-names
         */
        'linebreak-style': 'off',
        /**
         * The following are eslint rules from the promise-plugin
         * https://github.com/xjamundx/eslint-plugin-promise
         */
        /**
         * Prefer wait to then() for reading Promise values
         */
        'promise/prefer-await-to-then': 'warn',

        /**
         * Prefer async/await to the callback pattern
         */
        'promise/prefer-await-to-callbacks': 'warn',
    },
}
