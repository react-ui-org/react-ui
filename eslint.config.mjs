import { configs as visionapps } from '@visionappscz/eslint-config-visionapps';
import {
  defineConfig,
  globalIgnores,
} from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/*.js']),
  ...visionapps.base.recommended,
  ...visionapps.react.recommended,
  ...visionapps.base.typescript,
  ...visionapps.react.typescript,
  {
    name: 'react-ui/rules',
    rules: {
      'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      'react/require-default-props': 'off',
    },
  },
  {
    files: ['**/*.spec.tsx', '**/*.story.tsx'],
    name: 'react-ui/tests',
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
]);
