import type { PropTests } from '../types';

export const fullWidthPropTest: PropTests = [
  {
    name: 'fullWidth=true',
    props: { fullWidth: true },
  },
  {
    name: 'fullWidth=false',
    props: { fullWidth: false },
  },
];
