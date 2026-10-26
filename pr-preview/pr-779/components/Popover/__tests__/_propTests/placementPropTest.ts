import type { PropTests } from '../../../../../tests/playwright/types';

const positions = ['top', 'right', 'bottom', 'left'];
const alignment = [undefined, 'start', 'end'];

export const placementPropTest: PropTests = positions.flatMap((positionValue) => alignment.map(
  (alignValue) => ({
    name: alignValue ? `placement:enum=${positionValue}-${alignValue}` : `placement:enum=${positionValue}`,
    props: {
      placement: alignValue ? `${positionValue}-${alignValue}` : positionValue,
    },
  }),
));
