import type { PropTests } from '../../../../../tests/playwright/types';
import { colorForms } from './constants';

export const nextArrowColorPropTest: PropTests = colorForms.map((color) => ({
  name: `nextArrowColor:string=${color}`,
  props: {
    arrows: true,
    nextArrowColor: color,
  },
}));
