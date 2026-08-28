import React from 'react';
import { PopoverWrapper } from '..';
import type { PopoverWrapperProps } from '..';
import type { StoryProps } from '../../../../tests/playwright';

type PopoverWrapperForTestProps = StoryProps<PopoverWrapperProps, 'children'>;

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
