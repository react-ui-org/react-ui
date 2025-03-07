import type { PropTests } from '../../../../../tests/playwright/types';

export const checkedPropTest: PropTests = [
  {
    name: 'checked=false',
    props: { checked: false },
  },
  {
    name: 'checked=true',
    props: { checked: true },
  },
];
