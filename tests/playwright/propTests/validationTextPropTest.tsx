import React from 'react';
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
  {
    name: 'validationText=node',
    props: { validationText: <div>Node validation text</div> },
  },
];
