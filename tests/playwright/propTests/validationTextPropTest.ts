import type { PropTests } from '../types';

export const validationTextPropTest = (useUndefined: boolean = false): PropTests => {
  const propTests = [
    {
      name: 'validationText=long',
      props: { validationText: 'Extra long validationText that exceeds regular length that anyone would expect to input in this property.' },
    },
    {
      name: 'validationText=normal',
      props: { validationText: 'Some normal validationText.' },
    },
  ];

  if (useUndefined === true) {
    propTests.push({
      name: 'validationText=undefined',
      props: { validationText: undefined },
    });
  }

  return propTests;
};
