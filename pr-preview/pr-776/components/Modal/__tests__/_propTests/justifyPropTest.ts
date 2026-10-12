import type { PropTests } from '../../../../../tests/playwright/types';

const justifyValues = ['start', 'center', 'end', 'space-between', 'stretch'];

export const justifyPropTest: PropTests = justifyValues.map((value) => ({
  name: `justify:string=${value}`,
  props: {
    justify: value,
  },
}));
