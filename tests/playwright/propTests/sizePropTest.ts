import type { PropTests } from '../types';

export const sizePropTest: PropTests = [
  {
    name: 'size:string=small',
    props: { size: 'small' },
  },
  {
    name: 'size:string=medium',
    props: { size: 'medium' },
  },
  {
    name: 'size:string=large',
    props: { size: 'large' },
  },
];
