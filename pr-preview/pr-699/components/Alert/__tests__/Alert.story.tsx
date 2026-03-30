import React from 'react';
import type { HTMLAttributes } from 'react';
import { Alert } from '..';

// Types for story component will be improved when we have full TypeScript support
type AlertForTestProps = HTMLAttributes<HTMLDivElement>;

export const AlertForTest = ({
  ...props
} : AlertForTestProps) => (
  <Alert
    {...props}
  >
    <strong>This is notification title!</strong>
    {' '}
    This is notification content.
  </Alert>
);
