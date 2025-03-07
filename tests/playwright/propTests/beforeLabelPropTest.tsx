import React from 'react';
import { TestIcon } from '../components/TestIcon';
import type { PropTests } from '../types';

export const beforeLabelPropTest: PropTests = [
  {
    name: 'beforeLabel:node',
    props: { beforeLabel: <TestIcon /> },
  },
];
