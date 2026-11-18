import type { PropTests } from '../../../../../../tests/playwright/types';

export const positionPropTest: PropTests = [
  {
    name: 'position:string=top',
    props: {
      position: 'top',
    },
  },
  {
    name: 'position:string=center',
    props: {
      position: 'center',
    },
  },
];
