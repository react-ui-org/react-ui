import type { PropTests } from '../types';

export const helpTextPropTest: PropTests = [
  {
    name: 'helpText=long',
    props: { helpText: 'Extra long helpText that exceeds regular length that anyone would expect to input in this property.' },
  },
  {
    name: 'helpText=normal',
    props: { helpText: 'Some normal helpText.' },
  },
];
