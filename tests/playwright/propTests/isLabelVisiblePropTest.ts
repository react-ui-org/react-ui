import type { PropTests } from '../types';

export const isLabelVisiblePropTest: PropTests = [
  {
    name: 'isLabelVisible:boolean=true',
    props: { isLabelVisible: true },
  },
  {
    name: 'isLabelVisible:boolean=false',
    props: { isLabelVisible: false },
  },
];
