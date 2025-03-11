import { propTests } from '../../../../../tests/playwright';
import type { PropTests } from '../../../../../tests/playwright/types';

const checkedWithDisabledMix = propTests.disabledPropTest.map((propTest) => {
  const newTest = { ...propTest };
  return {
    ...newTest,
    name: `${newTest.name} & checked=true`,
    props: {
      ...newTest.props,
      checked: true,
    },
  };
});

const unCheckedWithDisabledMix = propTests.disabledPropTest.map((propTest) => {
  const newTest = { ...propTest };
  return {
    ...newTest,
    name: `${newTest.name} & checked=false`,
    props: {
      ...newTest.props,
      checked: false,
    },
  };
});

export const disabledWithCheckedPropTest: PropTests = [
  ...unCheckedWithDisabledMix,
  ...checkedWithDisabledMix,
];
