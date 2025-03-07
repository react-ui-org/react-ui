import type { PropTests } from '../types';

export const validationStatePropTest: PropTests = [
  {
    name: 'validationState:string=valid',
    props: { validationState: 'valid' },
  },
  {
    name: 'validationState:string=warning',
    props: { validationState: 'warning' },
  },
  {
    name: 'validationState:string=invalid',
    props: { validationState: 'invalid' },
  },
  {
    name: 'validationState:undefined',
    props: { validationState: undefined },
  },
];
