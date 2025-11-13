import React from 'react';
import type { HTMLAttributes } from 'react';
import { PopoverWrapper } from '..';

// Types for story component will be improved when we have full TypeScript support
type PopoverWrapperForTestProps = HTMLAttributes<HTMLDivElement>;

export const PopoverWrapperForTest = ({
  ...props
}: PopoverWrapperForTestProps) => {
  const {
    children,
    ...restProps
  } = props;

  return (
    <PopoverWrapper {...restProps}>
      {children ?? 'Content'}
    </PopoverWrapper>
  );
};
