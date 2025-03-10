import type { PropTests } from '../types';

export const validationTextPropTest: PropTests = [
  {
    name: 'validationText=long',
    props: { validationText: 'Extra long validationText that exceeds regular length that anyone would expect to input in this property.' },
  },
  {
    name: 'validationText=normal',
    props: { validationText: 'Some normal validationText.' },
  },
];
