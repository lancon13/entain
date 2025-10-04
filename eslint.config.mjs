// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import json from '@eslint/json'
import css from '@eslint/css'
// import eslintConfigPrettier from '@vue/eslint-config-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    {
        ignores: [
            '**/node_modules/',
            '**/dist/',
            '**/build/',
            '**/.output/',
            '**/.nuxt/',
            '**/*.min.js',
            '**/.encore',
            '**/coverage/',
            '**/_generated/',
            '**/.pnpm-store/',
            '**/database.ts',
            '**/*.sql'
        ]
    },

    // eslintConfigPrettier,

    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        plugins: { js },
        extends: ['js/recommended']
    },
    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        languageOptions: { globals: { ...globals.browser, ...globals.node } }
    },

    tseslint.configs.recommended,

    {
        files: ['**/*.json', '**/*.jsonc'],
        plugins: { json },
        language: 'json/jsonc',
        extends: ['json/recommended'],
        rules: {
            'json/no-duplicate-keys': 'error',
            'json/no-comments': 'off'
        }
    },
    {
        files: ['**/*.json5'],
        plugins: { json },
        language: 'json/json5',
        extends: ['json/recommended']
    },
    {
        files: ['**/*.css'],
        plugins: { css },
        language: 'css/css',
        extends: ['css/recommended']
    },

    {
        files: ['**/*.{js,mjs,cjs,ts,vue}'],
        rules: {
            // Add non-stylistic JS rules or overrides here if needed
            // e.g., 'no-unused-vars': 'warn',
            'brace-style': [
                'error',
                '1tbs',
                {
                    allowSingleLine: false
                }
            ],
            'indent': [
                'error',
                4,
                {
                    SwitchCase: 1,
                    flatTernaryExpressions: true
                }
            ],
            'curly': ['error', 'multi', 'consistent'],
            'linebreak-style': ['error', 'unix'],
            'multiline-ternary': ['error', 'always-multiline'],
            'newline-per-chained-call': [
                'error',
                {
                    ignoreChainWithDepth: 1
                }
            ],
            'no-irregular-whitespace': [
                'error',
                {
                    skipComments: true
                }
            ],
            'no-trailing-spaces': [
                'error',
                {
                    skipBlankLines: true,
                    ignoreComments: true
                }
            ],
            'no-unused-vars': 'warn',
            'object-curly-spacing': ['error', 'always'],
            'prefer-promise-reject-errors': 'off',
            'prefer-arrow-callback': [
                'error',
                { allowNamedFunctions: true, allowUnboundThis: false }
            ],
            'quote-props': ['error', 'consistent-as-needed'],
            'quotes': ['warn', 'single'],
            'semi': [
                'error',
                'never',
                {
                    beforeStatementContinuationChars: 'any'
                }
            ],
            'max-len': 'off'
        }
    },

    pluginVue.configs['flat/base'],
    {
        files: ['**/*.vue'],
        languageOptions: { parserOptions: { parser: tseslint.parser } },
        rules: {
            'vue/attribute-hyphenation': ['error', 'always'],
            'vue/attributes-order': [
                'error',
                {
                    alphabetical: false,
                    order: [
                        'DEFINITION',
                        'LIST_RENDERING',
                        'CONDITIONALS',
                        'RENDER_MODIFIERS',
                        'GLOBAL',
                        ['UNIQUE', 'SLOT'],
                        'TWO_WAY_BINDING',
                        'OTHER_DIRECTIVES',
                        'OTHER_ATTR',
                        'EVENTS',
                        'CONTENT'
                    ]
                }
            ],
            'vue/component-name-in-template-casing': [
                'error',
                'kebab-case',
                {
                    registeredComponentsOnly: false
                }
            ],
            'vue/custom-event-name-casing': ['error', 'kebab-case'],
            'vue/html-closing-bracket-newline': [
                0,
                {
                    multiline: 'never',
                    singleline: 'never'
                }
            ],
            'vue/html-indent': [
                'error',
                4,
                {
                    baseIndent: 1
                }
            ],
            'vue/html-self-closing': [
                'error',
                {
                    html: {
                        component: 'always',
                        normal: 'always',
                        void: 'any'
                    },
                    math: 'always',
                    svg: 'always'
                }
            ],
            'vue/max-attributes-per-line': [
                'error',
                {
                    singleline: 3
                }
            ],
            'vue/no-reserved-keys': 0,
            'vue/no-unused-components': 'warn',
            'vue/order-in-components': [
                'error',
                {
                    order: [
                        'el',
                        'name',
                        'parent',
                        'functional',
                        ['delimiters', 'comments'],
                        ['components', 'directives', 'filters'],
                        'extends',
                        'mixins',
                        'inheritAttrs',
                        'model',
                        ['props', 'propsData'],
                        'methods',
                        'computed',
                        'LIFECYCLE_HOOKS',
                        [
                            'beforeCreate',
                            'created',
                            'beforeMount',
                            'mounted',
                            'beforeUpdate',
                            'updated',
                            'activated',
                            'deactivated',
                            'beforeDestroy',
                            'destroyed'
                        ],
                        'watch',
                        ['template', 'render'],
                        'renderError',
                        'data'
                    ]
                }
            ],
            'vue/prop-name-casing': ['error', 'camelCase'],
            'vue/script-indent': [
                'error',
                4,
                {
                    baseIndent: 1,
                    switchCase: 1
                }
            ],
            'vue/no-multi-spaces': ['error'],
            'vue/singleline-html-element-content-newline': [0],
            'vue/v-slot-style': [
                'error',
                {
                    atComponent: 'v-slot',
                    default: 'shorthand',
                    named: 'shorthand'
                }
            ],
            'vue/v-on-event-hyphenation': ['error', 'always'],
            'indent': 'off',
            '@typescript-eslint/indent': 'off'
        }
    }
])
