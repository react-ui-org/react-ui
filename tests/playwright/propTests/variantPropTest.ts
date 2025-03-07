import type { PropTests } from '../types';

export const variantPropTest: PropTests = [
  {
    name: 'variant:string=filled',
    props: { variant: 'filled' },
  },
  {
    name: 'variant:string=outline',
    props: { variant: 'outline' },
  },
];
