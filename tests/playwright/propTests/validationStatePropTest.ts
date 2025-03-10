import type { PropTests } from '../types';

export const validationStatePropTest: PropTests = [
  {
    name: 'validationState=valid',
    props: { validationState: 'valid' },
  },
  {
    name: 'validationState=warning',
    props: { validationState: 'warning' },
  },
  {
    name: 'validationState=invalid',
    props: { validationState: 'invalid' },
  },
];
