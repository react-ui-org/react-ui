import type { PropTests } from '../types';

export const checkedPropTest: PropTests = [
  {
    name: 'checked:boolean=true',
    props: { checked: true },
  },
  {
    name: 'checked:boolean=false',
    props: { checked: false },
  },
];
