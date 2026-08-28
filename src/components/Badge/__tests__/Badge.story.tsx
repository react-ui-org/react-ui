import React from 'react';
import { Badge } from '..';
import type { BadgeProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type BadgeForTestProps = StoryProps<BadgeProps, 'label'>;

export const BadgeForTest = ({
  label = 'Badge label',
  ...props
}: BadgeForTestProps) => (
  <Badge label={label} {...props} />
);
