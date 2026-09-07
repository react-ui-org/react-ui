import type { PropTests } from '../../../../../tests/playwright/types';

export const endShadowBackgroundPropTest: PropTests = [
  {
    name: 'endShadowBackground:string=gradient',
    props: {
      endShadowBackground: 'linear-gradient(rgba(255 0 0 / 0), rgba(255 0 0 / 0.5), rgb(255, 0, 0))',
    },
  },
];
