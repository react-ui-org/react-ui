import type { PropTests } from '../../../../../tests/playwright/types';

export const fieldLayoutPropTest: PropTests = [
  {
    name: 'fieldLayout:string=horizontal',
    props: {
      fieldLayout: 'horizontal',
    },
  },
  {
    name: 'fieldLayout:string=vertical',
    props: {
      fieldLayout: 'vertical',
    },
  },
];
