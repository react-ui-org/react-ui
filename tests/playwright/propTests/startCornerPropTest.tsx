import React from 'react';
import { TestIcon } from '../components/TestIcon';
import type { PropTests } from '../types';

export const startCornerPropTest: PropTests = [
  {
    name: 'startCorner:node',
    props: { startCorner: <TestIcon /> },
  },
];
