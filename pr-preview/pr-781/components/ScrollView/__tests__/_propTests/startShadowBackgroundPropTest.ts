import type { PropTests } from '../../../../../tests/playwright/types';

export const startShadowBackgroundPropTest: PropTests = [
  {
    name: 'startShadowBackground:string=gradient',
    props: {
      startShadowBackground: 'linear-gradient(rgb(255, 0, 0), rgba(255 0 0 / 0.5), rgba(255 0 0 / 0))',
    },
  },
];
