import { mixPropTests } from '../../../../../../tests/playwright';
import type { PropTests } from '../../../../../../tests/playwright/types';
import { directionPropTest } from '../directionPropTest';
import { endShadowBackgroundPropTest } from '../endShadowBackgroundPropTest';

const [verticalTest, horizontalTest] = directionPropTest;

export const mixEndShadowBackgroundDirectionPropTest: PropTests = [
  ...mixPropTests([
    [verticalTest],
    endShadowBackgroundPropTest,
  ]),
  ...endShadowBackgroundPropTest.map((test) => ({
    ...test,
    name: `${horizontalTest.name} & ${test.name}`,
    props: {
      ...horizontalTest.props,
      ...test.props,
      endShadowBackground: 'linear-gradient(to left, rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))',
    },
  })),
];
