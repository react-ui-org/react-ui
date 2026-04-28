import { mixPropTests } from '../../../../../../tests/playwright';
import type { PropTests } from '../../../../../../tests/playwright/types';
import { arrowsPropTest } from '../arrowsPropTest';
import { directionPropTest } from '../directionPropTest';

const [arrowsTrue, arrowFalse] = arrowsPropTest;
const [directionVertical, directionHorizontal] = directionPropTest;

export const mixArrowsDirectionPropTest: PropTests = [
  ...mixPropTests([
    [directionVertical],
    arrowsPropTest,
  ]),
  {
    name: `${directionHorizontal.name} & ${arrowFalse.name}`,
    props: {
      ...directionHorizontal.props,
      ...arrowFalse.props,
      endShadowBackground: 'linear-gradient(to left, rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))',
      startShadowBackground: 'linear-gradient(to right, rgb(255, 0, 0), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))',
    },
  },
  {
    name: `${directionHorizontal.name} & ${arrowsTrue.name}`,
    props: {
      ...directionHorizontal.props,
      ...arrowsTrue.props,
      endShadowBackground: 'linear-gradient(to left, rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))',
      startShadowBackground: 'linear-gradient(to right, rgb(255, 0, 0), rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0))',
    },
  },
];
