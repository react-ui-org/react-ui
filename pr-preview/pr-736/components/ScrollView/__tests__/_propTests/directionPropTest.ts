import type { PropTests } from '../../../../../tests/playwright/types';

export const directionPropTest: PropTests = [
  {
    name: 'direction:string=vertical',
    props: {
      direction: 'vertical',
    },
  },
  {
    name: 'direction:string=horizontal',
    props: {
      direction: 'horizontal',
    },
  },
];
