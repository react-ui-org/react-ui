import type { PropTests } from '../types';

export const disabledPropTest: PropTests = [
  {
    name: 'disabled:boolean=false',
    props: { disabled: false },
  },
  {
    name: 'disabled:boolean=true',
    props: { disabled: true },
  },
];
