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
    },
  };
  