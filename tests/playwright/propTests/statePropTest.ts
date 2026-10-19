import type { PropTests } from '../types';

export const statePropTest: PropTests = [
  {
    name: 'state:string=valid',
    props: { state: 'valid' },
  },
  {
    name: 'state:string=warning',
    props: { state: 'warning' },
  },
  {
    name: 'state:string=invalid',
    props: { state: 'invalid' },
  },
  {
    name: 'state:string=changed',
    props: { state: 'changed' },
  },
  {
    name: 'state:undefined',
    props: { state: undefined },
  },
];
