import type { PropTests } from '../../../../../tests/playwright/types';

export const alignPropTest: PropTests = [
  {
    name: 'align:string=top',
    props: {
      align: 'top',
    },
  },
  {
    name: 'align:string=middle',
    props: {
      align: 'middle',
    },
  },
  {
    name: 'align:string=bottom',
    props: {
      align: 'bottom',
    },
  },
  {
    name: 'align:string=baseline',
    props: {
      align: 'baseline',
    },
  },
];
