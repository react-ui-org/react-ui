import React from 'react';
import type { PropTests } from '../types';

export const labelPropTest: PropTests = [
  {
    name: 'label',
    props: { label: 'Extra long label that exceeds regular length that anyone would expect' },
  },
  {
    name: 'nodeLabel',
    props: { label: <div>Label as node</div> },
  },
];
