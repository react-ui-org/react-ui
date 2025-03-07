import type { PropTests } from '../types';

export const layoutPropTest: PropTests = [
  {
    name: 'layout:string=vertical',
    props: { layout: 'vertical' },
  },
  {
    name: 'layout:string=horizontal',
    props: { layout: 'horizontal' },
  },
];
