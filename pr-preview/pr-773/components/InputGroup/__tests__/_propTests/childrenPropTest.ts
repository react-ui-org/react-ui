import type { PropTests } from '../../../../../tests/playwright/types';

export const childrenPropTest: PropTests = [
  {
    name: 'children:node[single]',
    props: { childrenVariant: 'single' },
  },
  {
    name: 'children:node[multiple]',
    props: { childrenVariant: 'multiple' },
  },
];
