import type { PropTests } from '../types';

export const priorityPropTest: PropTests = [
  {
    name: 'priority=filled',
    props: { priority: 'filled' },
  },
  {
    name: 'priority=outline',
    props: { priority: 'outline' },
  },
  {
    name: 'priority=flat',
    props: { priority: 'flat' },
  },
];
