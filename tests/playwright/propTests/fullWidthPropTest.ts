import type { PropTests } from '../types';

export const fullWidthPropTest: PropTests = [
  {
    name: 'fullWidth:boolean=true',
    props: { fullWidth: true },
  },
  {
    name: 'fullWidth:boolean=false',
    props: { fullWidth: false },
  },
];
