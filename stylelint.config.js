module.exports = {
  extends: [
    '@visionappscz/stylelint-config-visionapps',
    '@visionappscz/stylelint-config-visionapps-order',
    'stylelint-config-css-modules',
  ],
  rules: {
    indentation: 2,
    'at-rule-no-unknown': [
      true, {
        ignoreAtRules: [
          'at-root',
          'content',
          'debug',
          'each',
          'else',
          'error',
          'extend',
          'for',
          'function',
          'if',
          'include',
          'mixin',
          'return',
          'warn',
          'while',
        ]
      }
    ],
  },
};
