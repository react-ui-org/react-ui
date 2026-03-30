import type { PropTests } from '../../../../../tests/playwright/types';

export const labelWidthPropTest: PropTests = [
  {
    name: 'labelWidth:string=auto',
    props: {
      fieldLayout: 'horizontal',
      labelWidth: 'auto',
    },
  },
  {
    name: 'labelWidth:string=default',
    props: {
      fieldLayout: 'horizontal',
      labelWidth: 'default',
    },
  },
  {
    name: 'labelWidth:string=limited',
    props: {
      fieldLayout: 'horizontal',
      labelWidth: 'limited',
    },
  },
  {
    name: 'labelWidth:string=30px',
    props: {
      fieldLayout: 'horizontal',
      labelWidth: '30px',
    },
  },
];
