import type { PropTests } from '../../../../../tests/playwright/types';

export const validationTextsPropTest: PropTests = [
  {
    name: 'validationTexts:string[]=single',
    props: {
      validationTexts: ['Validation text.'],
    },
  },
  {
    name: 'validationTexts:string[]=multiple',
    props: {
      validationTexts: [
        'First validation text.',
        'Second validation text.',
      ],
    },
  },
];
