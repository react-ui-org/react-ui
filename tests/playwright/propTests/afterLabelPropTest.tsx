import React from 'react';
import { TestIcon } from '../components/TestIcon';
import type { PropTests } from '../types';

export const afterLabelPropTest: PropTests = [
  {
    name: 'afterLabel',
    props: { afterLabel: <TestIcon /> },
  },
];
