import React from 'react';
import { Alert } from '..';
import type { AlertProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type AlertForTestProps = StoryProps<AlertProps, 'children'>;

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
