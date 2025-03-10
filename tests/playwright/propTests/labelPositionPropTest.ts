import type { PropTests } from '../types';

export const labelPositionPropTest: PropTests = [
  {
    name: 'labelPosition=before',
    props: { labelPosition: 'before' },
  },
  {
    name: 'labelPosition=after',
    props: { labelPosition: 'after' },
  },
];
