import { mixPropTests } from '../../../../../../tests/playwright';
import type { PropTests } from '../../../../../../tests/playwright/types';
import { directionPropTest } from '../directionPropTest';
import { startShadowBackgroundPropTest } from '../startShadowBackgroundPropTest';

const [verticalTest, horizontalTest] = directionPropTest;

export const mixStartShadowBackgroundDirectionPropTest: PropTests = [
  ...mixPropTests([
    [verticalTest],
    startShadowBackgroundPropTest,
  ]),
  ...startShadowBackgroundPropTest.map((test) => ({
    ...test,
    name: `${horizontalTest.name} & ${test.name}`,
    props: {
      ...horizontalTest.props,
      ...test.props,
      startShadowBackground: 'linear-gradient(to right, rgb(255, 0, 0), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))',
    },
  })),
];
