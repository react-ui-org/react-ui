import React from 'react';
import { TestIcon } from '../components/TestIcon';
import type { PropTests } from '../types';

export const iconPropTest: PropTests = [
  {
    name: 'icon',
    props: { icon: <TestIcon /> },
  },
];
