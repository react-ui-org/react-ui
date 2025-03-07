import type { PropTests } from '../types';

export const helpTextPropTest = (useUndefined: boolean = false): PropTests => {
  const propTests = [
    {
      name: 'helpText=long',
      props: { helpText: 'Extra long helpText that exceeds regular length that anyone would expect to input in this property.' },
    },
    {
      name: 'helpText=normal',
      props: { helpText: 'Some normal helpText.' },
    },
  ];

  if (useUndefined === true) {
    propTests.push({
      name: 'helpText=undefined',
      props: { helpText: undefined },
    });
  }

  return propTests;
};
