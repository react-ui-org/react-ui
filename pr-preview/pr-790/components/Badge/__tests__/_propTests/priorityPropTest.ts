import { propTests } from '../../../../../tests/playwright';
import type { PropTests } from '../../../../../tests/playwright/types';

const subsetOfValues = [
  'filled',
  'outline',
];

export const priorityPropTest: PropTests = propTests.priorityPropTest
  .filter(({ props }) => subsetOfValues.includes(props.priority as string));
