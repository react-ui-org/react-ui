import type { PropTests } from '../../../../../tests/playwright/types';

export const autoFlowPropTest: PropTests = [
  {
    name: 'autoFlow:string=column',
    props: {
      autoFlow: 'column',
    },
  },
  {
    name: 'autoFlow:string=row',
    props: {
      autoFlow: 'row',
    },
  },
];
