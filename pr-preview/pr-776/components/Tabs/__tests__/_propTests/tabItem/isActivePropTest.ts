import type { PropTests } from '../../../../../../tests/playwright/types';

export const isActivePropTest: PropTests = [
  {
    name: 'isActive:boolean=true',
    props: {
      isActive: true,
    },
  },
  {
    name: 'isActive:boolean=false',
    props: {
      isActive: false,
    },
  },
];
