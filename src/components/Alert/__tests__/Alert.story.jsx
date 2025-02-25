import React from 'react';
import { Alert } from '..';

export const AlertForTest = ({
  ...props
}) => (
  <Alert
    {...props}
  >
    <strong>This is notification title!</strong>
    {' '}
    This is notification content.
  </Alert>
);
