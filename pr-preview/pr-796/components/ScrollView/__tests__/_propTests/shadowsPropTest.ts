import type { PropTests } from '../../../../../tests/playwright/types';

export const shadowsPropTest: PropTests = [
  {
    name: 'shadows:boolean=true',
    props: {
      shadows: true,
    },
  },
  {
    name: 'shadows:boolean=false',
    props: {
      shadows: false,
    },
  },
];
