import type { PropTests } from '../../../../../tests/playwright/types';

export const justifyPropTest: PropTests = [
  {
    name: 'justify:string=start',
    props: {
      justify: 'start',
    },
  },
  {
    name: 'justify:string=center',
    props: {
      justify: 'center',
    },
  },
  {
    name: 'justify:string=end',
    props: {
      justify: 'end',
    },
  },
  {
    name: 'justify:string=space-between',
    props: {
      justify: 'right',
    },
  },
];
