import type { PropTests } from '../types';

export const actionColorPropTest: PropTests = [
  {
    name: 'color:string=primary',
    props: { color: 'primary' },
  },
  {
    name: 'color:string=secondary',
    props: { color: 'secondary' },
  },
  {
    name: 'color:string=selected',
    props: { color: 'selected' },
  },
];
