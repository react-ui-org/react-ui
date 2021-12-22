module.exports = {
  extends: [
    '@visionappscz/stylelint-config',
    '@visionappscz/stylelint-config/order',
    '@visionappscz/stylelint-config/scss',
    '@visionappscz/stylelint-config/cssModules',
  ],
  rules: {
    // Check that custom property name starts with `rui` prefix and follows either SUIT CSS convention
    // (for components theming) or kebab-case syntax (for global design tokens and local properties).
    //
    // A: mandatory prefix
    // B: SUIT CSS pattern (derived from BEM pattern: https://gist.github.com/Potherca/f2a65491e63338659c3a0d2b07eee382)
    // C: kebab-case pattern
    // D: … with optional Sass interpolation used in generated custom properties (e.g. Button or form fields)
    'custom-property-pattern': [
      // ↓ A   ↓ B                                                               OR ↓ C             ↓ D
      '^rui-(?:([A-Z]([A-Za-z0-9-]+)?((__([a-z0-9]+-?)+)+(--([a-z0-9]+-?)+){0,2})+)|(([a-z0-9]+-?)+)(#{\\$[a-z-]+})?)$',
      {
        message: 'Expected custom property name to start with `rui-*` and follow either SUIT CSS or kebab-case syntax',
      },
    ],
    // Require camelCase pattern for class names as they are picked up by dot notation in JS.
    // Also allow kebab-case class names for global helper and utility classes.
    //
    // A: camelCase pattern
    // B: kebab-case pattern
    'selector-class-pattern': [
      //   ↓ A                              OR ↓ B
      '^(?:(([a-z][a-z0-9]*)([A-Z][a-z0-9]+)*)|(([a-z0-9]+-?)+))$',
      {
        message: 'Expected class selector to be either camelCase (CSS Modules) or kebab-case (global classes)',
      },
    ],
  },
};
