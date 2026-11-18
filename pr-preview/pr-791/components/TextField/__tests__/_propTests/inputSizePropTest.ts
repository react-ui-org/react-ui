import type { PropTests } from '../../../../../tests/playwright/types';

export const inputSizePropTest: PropTests = [
  {
    name: 'inputSize:number=3',
    props: { inputSize: 3 },
  },
  {
    name: 'inputSize:number=6',
    props: { inputSize: 6 },
  },
  {
    name: 'inputSize:number=12',
    props: { inputSize: 12 },
  },
  {
    name: 'inputSize:number=24',
    props: { inputSize: 24 },
  },
];
