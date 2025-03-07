import type { PropTests } from '../types';

export const blockPropTest: PropTests = [
  {
    name: 'block:boolean=false',
    props: { block: false },
  },
  {
    name: 'block:boolean=true',
    props: { block: true },
  },
];
