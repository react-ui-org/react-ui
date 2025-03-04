import type { PropTests } from '../types';

export const blockPropTest: PropTests = [
  {
    name: 'block=false',
    props: { block: false },
  },
  {
    name: 'block=true',
    props: { block: true },
  },
];
