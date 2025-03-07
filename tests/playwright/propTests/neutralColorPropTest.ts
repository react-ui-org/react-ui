import type { PropTests } from '../types';

export const neutralColorPropTest: PropTests = [
  {
    name: 'color:string=dark',
    props: { color: 'dark' },
  },
  {
    name: 'color:string=light',
    props: { color: 'light' },
  },
];
