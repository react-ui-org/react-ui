import type { PropTests } from '../../../../../tests/playwright/types';

const positions = ['top', 'right', 'bottom', 'left'];
const alignment = [undefined, 'start', 'end'];

export const placementPropTest: PropTests = alignment
  .map((alignValue) => positions.map((positionValue) => ({
    name: alignValue ? `placement:enum=${positionValue}-${alignValue}` : `placement:enum=${positionValue}`,
    props: {
      placement: alignValue ? `${positionValue}-${alignValue}` : positionValue,
    },
  }))).reduce((prev, next) => [...prev, ...next]);
