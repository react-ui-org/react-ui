import React from 'react';
import { TestIcon } from '../components/TestIcon';
import type { PropTests } from '../types';

export const endCornerPropTest: PropTests = [
  {
    name: 'endCorner:node',
    props: { endCorner: <TestIcon /> },
  },
];
