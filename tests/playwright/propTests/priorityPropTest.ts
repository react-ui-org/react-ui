import type { PropTests } from '../types';

export const priorityPropTest: PropTests = [
  {
    name: 'priority:string=filled',
    props: { priority: 'filled' },
  },
  {
    name: 'priority:string=outline',
    props: { priority: 'outline' },
  },
  {
    name: 'priority:string=flat',
    props: { priority: 'flat' },
  },
];
