import type { PropTests } from '../../../../../tests/playwright/types';

const lines = [1, 3, 5];

export const linesPropTest: PropTests = lines.map((line) => ({
  name: `lines:number=${line}`,
  props: {
    lines,
  },
}));
