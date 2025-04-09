import type { PropTests } from '../../../../../tests/playwright/types';

export const densePropTest: PropTests = [
  {
    name: 'dense:boolean=true',
    props: {
      dense: true,
    },
  },
  {
    name: 'dense:boolean=false',
    props: {
      dense: false,
    },
  },
];
