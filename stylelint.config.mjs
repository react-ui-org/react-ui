import { customPropertyPattern } from '@react-ui-org/stylelint-config/helpers';

export default {
  extends: [
    '@react-ui-org/stylelint-config',
    '@react-ui-org/stylelint-config/scss',
    '@react-ui-org/stylelint-config/cssModules',
  ],
  rules: {
    // Check that custom property name starts with `rui` prefix and follows either SUIT CSS convention
    // (for components theming) or kebab-case syntax (for global design tokens and local properties).
    'custom-property-pattern': customPropertyPattern(['rui']),

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
