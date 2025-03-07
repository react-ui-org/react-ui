import type { PropTests } from '../types';

export const labelPositionPropTest = (useUndefined: boolean = false): PropTests => {
  const propTests = [
    {
      name: 'labelPosition=before',
      props: { labelPosition: 'before' },
    },
    {
      name: 'labelPosition=after',
      props: { labelPosition: 'after' },
    },
  ];

  if (useUndefined === true) {
    propTests.push({
      name: 'labelPosition=undefined',
      props: { labelPosition: undefined },
    });
  }

  return propTests;
};
