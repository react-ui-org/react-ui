import type { PropTests } from '../types';

export const validationStatePropTest = (useUndefined: boolean = false): PropTests => {
  const propTests = [
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

  if (useUndefined === true) {
    propTests.push({
      name: 'validationState=undefined',
      props: { validationState: undefined },
    });
  }

  return propTests;
};
