import type { PropTests } from '../../../../../tests/playwright/types';

export const mutedPropTest: PropTests = [
  {
    name: 'muted:boolean=true',
    props: {
      muted: true,
    },
  },
  {
    name: 'muted:boolean=false',
    props: {
      muted: false,
    },
  },
];
