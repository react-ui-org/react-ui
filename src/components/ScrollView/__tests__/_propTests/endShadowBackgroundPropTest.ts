import type { PropTests } from '../../../../../tests/playwright/types';
import { colorForms } from './constants';

export const endShadowBackgroundPropTest: PropTests = [
  ...colorForms.map((color) => ({
    name: `endShadowBackground:string=${color}`,
    props: {
      endShadowBackground: color,
    },
  })),
  {
    name: 'endShadowBackground:string=gradient',
    props: {
      endShadowBackground: 'linear-gradient(90deg,rgba(155, 83, 42, 1) 39%, rgba(115, 199, 87, 1) 100%, rgba(83, 93, 237, 1) 100%)',
    },
  },
];
