import { propTests } from '../../../../../tests/playwright';
import type { PropTests } from '../../../../../tests/playwright/types';

export const labelPropTest: PropTests = [
  ...propTests.labelPropTest.filter((test) => typeof test.props?.label === 'string'),
];
