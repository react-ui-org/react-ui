module.exports = {
  extends: [
    'stylelint-config-visionapps',
    'stylelint-config-visionapps-order',
  ],
  rules: {
    indentation: 2,
    'property-no-unknown': [
      true, {
        ignoreProperties: ['composes'],
      },
    ],
    'at-rule-no-unknown': [
      true, {
        ignoreAtRules: [
          'extend',
          'at-root',
          'debug',
          'warn',
          'error',
          'if',
          'else',
          'for',
          'each',
          'while',
          'mixin',
          'include',
          'content',
          'return',
          'function'
        ]
      }
    ],
    'order/properties-alphabetical-order': null
  }
};
