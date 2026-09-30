import { propTests } from '../../../../../../tests/playwright';
import type { PropTests } from '../../../../../../tests/playwright/types';

export const sizePropTest: PropTests = [
  ...propTests.sizePropTest,
  {
    name: 'size:string=fullscreen',
    props: {
      size: 'fullscreen',
    },
  },
  {
    name: 'size:string=auto',
    props: {
      size: 'auto',
    },
  },
];
