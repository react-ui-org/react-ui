import type { PropTests } from '../../../../../tests/playwright/types';
import { lengthValueForms } from './constants';

export const startShadowSizePropTest: PropTests = lengthValueForms.map((length) => ({
  name: `startShadowSize:string=${length}`,
  props: {
    startShadowBackground: 'red',
    startShadowSize: length,
  },
}));
