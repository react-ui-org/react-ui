import React from 'react';
import type { ElementType } from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './PopoverWrapper.module.scss';
import type { PopoverWrapperProps } from './Popover.types';

export const PopoverWrapper: React.FunctionComponent<PopoverWrapperProps> = ({
  children,
  tag = 'div',
  ...restProps
}: PopoverWrapperProps) => {
  const Tag = tag as ElementType;

  return (
    <Tag
      {...transferProps(restProps)}
      className={styles.root}
    >
      {children}
    </Tag>
  );
};

export const PopoverWrapperWithContext = withGlobalProps<PopoverWrapperProps, HTMLElement>(PopoverWrapper, 'PopoverWrapper');

export default PopoverWrapperWithContext;
