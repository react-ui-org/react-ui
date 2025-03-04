import type { PropTests } from '../types';

export const neutralColorPropTest: PropTests = [
  {
    name: 'color=dark',
    props: { color: 'dark' },
  },
  {
    name: 'color=light',
    props: { color: 'light' },
  },
];
