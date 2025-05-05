import type { PropTests } from '../types';

export const raisedPropTest: PropTests = [
  {
    name: 'raised:boolean=true',
    props: { raised: true },
  },
  {
    name: 'raised:boolean=false',
    props: { raised: false },
  },
];
