import type { PropTests } from '../../../../../tests/playwright/types';
import { lengthValueForms } from './constants';

export const endShadowSizePropTest: PropTests = lengthValueForms.map((length) => ({
  name: `endShadowSize:string=${length}`,
  props: {
    endShadowBackground: 'red',
    endShadowSize: length,
  },
}));
