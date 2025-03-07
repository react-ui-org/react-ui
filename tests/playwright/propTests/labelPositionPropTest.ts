import type { PropTests } from '../types';

export const labelPositionPropTest: PropTests = [
  {
    name: 'labelPosition:string=before',
    props: { labelPosition: 'before' },
  },
  {
    name: 'labelPosition:string=after',
    props: { labelPosition: 'after' },
  },
];
