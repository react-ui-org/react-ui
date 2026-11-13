import { configs } from '@react-ui-org/eslint-config';
import {
  defineConfig,
  globalIgnores,
} from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/*.js']),
  // Only these directories are linted, so `eslint` can be run without a path
  globalIgnores(['*', '!src/', '!tests/'], 'app/lint-scope'),
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
]);
