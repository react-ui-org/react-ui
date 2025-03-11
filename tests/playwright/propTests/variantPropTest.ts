import type { PropTests } from '../types';

export const variantPropTest: PropTests = [
  {
    name: 'variant=filled',
    props: { variant: 'filled' },
  },
  {
    name: 'variant=outline',
    props: { variant: 'outline' },
  },
];
