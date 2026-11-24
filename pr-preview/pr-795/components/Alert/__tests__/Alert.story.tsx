import React from 'react';
import { Alert } from '..';
import type { AlertProps } from '..';
import {
  useSpy,
  withSpy,
} from '../../../../tests/playwright/utils/spy';
import type { StoryProps } from '../../../../tests/playwright';

type AlertForTestProps = StoryProps<AlertProps, 'children'>;

export const AlertForTest = ({
  ...props
}: AlertForTestProps) => (
  <Alert
    {...props}
  >
    <strong>This is notification title!</strong>
    {' '}
    This is notification content.
  </Alert>
);

export const AlertSpyForTest = withSpy((props: AlertForTestProps) => {
  const onClose = useSpy('onClose', () => true);

  return (
    <AlertForTest
      onClose={onClose}
      {...props}
    />
  );
});
