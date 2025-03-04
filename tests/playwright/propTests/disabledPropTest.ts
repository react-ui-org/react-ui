import type { PropTests } from '../types';

export const disabledPropTest: PropTests = [
  {
    name: 'disabled=false',
    props: { disabled: false },
  },
  {
    name: 'disabled=true',
    props: { disabled: true },
  },
];
