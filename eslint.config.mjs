import { configs } from '@react-ui-org/eslint-config';
import {
  defineConfig,
  globalIgnores,
} from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/*.js']),
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
