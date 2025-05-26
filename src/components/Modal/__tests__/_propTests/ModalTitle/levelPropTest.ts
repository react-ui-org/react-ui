import type { PropTests } from '../../../../../../tests/playwright/types';

const levelValues = [1, 2];

export const levelPropTest: PropTests = levelValues.map((value) => ({
  name: `level:number=${value}`,
  props: {
    level: value,
  },
}));
