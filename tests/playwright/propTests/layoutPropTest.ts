import type { PropTests } from '../types';

export const layoutPropTest: PropTests = [
  {
    name: 'layout=vertical',
    props: { layout: 'vertical' },
  },
  {
    name: 'layout=horizontal',
    props: { layout: 'horizontal' },
  },
];
