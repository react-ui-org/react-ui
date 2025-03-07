import type { PropTests } from '../types';

export const layoutPropTest = (useUndefined: boolean = false): PropTests => {
  const propTests = [
    {
      name: 'layout=vertical',
      props: { layout: 'vertical' },
    },
    {
      name: 'layout=horizontal',
      props: { layout: 'horizontal' },
    },
  ];

  if (useUndefined === true) {
    propTests.push({
      name: 'layout=undefined',
      props: { layout: undefined },
    });
  }

  return propTests;
};
