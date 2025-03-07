import type { PropTests } from '../types';

export const isLabelVisiblePropTest: PropTests = [
  {
    name: 'isLabelVisible=true',
    props: { isLabelVisible: true },
  },
  {
    name: 'isLabelVisible=false',
    props: { isLabelVisible: false },
  },
];
