module.exports = {
  extends: [
    '@visionappscz/stylelint-config-visionapps',
    '@visionappscz/stylelint-config-visionapps-order',
    'stylelint-config-css-modules',
  ],
  rules: {
    'at-rule-no-unknown': [
      true, {
        ignoreAtRules: [
          'at-root',
          'content',
          'debug',
          'each',
          'else',
          'else if',
          'error',
          'extend',
          'for',
          'forward',
          'function',
          'if',
          'include',
          'mixin',
          'return',
          'use',
          'warn',
          'while',
        ],
      },
    ],
    indentation: 2,
  },
};
