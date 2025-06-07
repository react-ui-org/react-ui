import type { PropTests } from '../../../../../tests/playwright/types';

export const arrowsPropTest: PropTests = [
  {
    name: 'arrows:boolean=true',
    props: {
      arrows: true,
    },
  },
  {
    name: 'arrows:boolean=false',
    props: {
      arrows: false,
    },
  },
];
