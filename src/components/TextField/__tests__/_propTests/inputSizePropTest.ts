import type { PropTests } from '../../../../../tests/playwright/types';

export const inputSizePropTest: PropTests = [
  {
    name: 'inputSize=3',
    props: { inputSize: 3 },
  },
  {
    name: 'inputSize=6',
    props: { inputSize: 6 },
  },
  {
    name: 'inputSize=12',
    props: { inputSize: 12 },
  },
  {
    name: 'inputSize=24',
    props: { inputSize: 24 },
  },
];
