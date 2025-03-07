import type { PropTests } from '../types';

export const requiredPropTest: PropTests = [
  {
    name: 'required:boolean=true',
    props: { required: true },
  },
  {
    name: 'required:boolean=false',
    props: { required: false },
  },
];
