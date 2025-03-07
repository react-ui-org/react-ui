import type { PropTests } from '../types';

export const requiredPropTest: PropTests = [
  {
    name: 'required=true',
    props: { required: true },
  },
  {
    name: 'required=false',
    props: { required: false },
  },
];
