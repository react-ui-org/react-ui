import React from 'react';
import { TestIcon } from '../components/TestIcon';
import type { PropTests } from '../types';

export const feedbackIconPropTest: PropTests = [
  {
    name: 'feedbackIcon:node',
    props: { feedbackIcon: <TestIcon /> },
  },
];
