import React from 'react';
import type { PropTests } from '../types';

export const helpTextPropTest: PropTests = [
  {
    name: 'helpText:string[long]',
    props: { helpText: 'Extra long helpText that exceeds regular length that anyone would expect to input in this property.' },
  },
  {
    name: 'helpText:string[normal]',
    props: { helpText: 'Some normal helpText.' },
  },
  {
    name: 'helpText:node[normal]',
    props: { validationText: <div>Node help text</div> },
  },
];
