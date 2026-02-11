import React from 'react';
import type { HTMLAttributes } from 'react';
import { Badge } from '..';

// Types for story component will be improved when we have full TypeScript support
type BadgeForTestProps = HTMLAttributes<HTMLDivElement>;

export const BadgeForTest = ({
  ...props
}: BadgeForTestProps) => (
  <Badge label="Badge label" {...props} />
);
