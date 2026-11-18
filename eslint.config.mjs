import { configs } from '@react-ui-org/eslint-config';
import {
  defineConfig,
  globalIgnores,
} from 'eslint/config';

export default defineConfig([
  // Only these paths are linted, so `eslint` can be run without a path
  globalIgnores(
    ['*', '!src/', '!tests/', '!scripts/', '!webpack/', '!*.config.{js,mjs}'],
    'app/lint-scope',
  ),
  globalIgnores([
    // The build writes the bundles of the library among the generated assets
    'src/docs/_assets/generated/**',
  ]),
  ...configs.base.recommended,
  ...configs.react.recommended,
  ...configs.base.typescript,
  ...configs.react.typescript,
  {
    name: 'react-ui/rules',
    rules: {
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    },
  },
  {
    files: [
      '*.config.{js,mjs}',
      'scripts/**/*',
      'webpack/**/*',
    ],
    name: 'react-ui/tooling',
    rules: {
      // Node ESM requires explicit file extensions
      'import-x/extensions': 'off',
      // Tooling runs only during development and build, so it imports development dependencies
      'import-x/no-extraneous-dependencies': ['error', { devDependencies: true }],
      // Command line tools report to the terminal
      'no-console': 'off',
    },
  },
]);
