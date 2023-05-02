import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './PopoverWrapper.scss';
import { PopoverWrapperProps } from './Popover.types';

export const PopoverWrapper: React.FunctionComponent<PopoverWrapperProps> = ({
  children,
  tag: Tag = 'div',
  ...restProps
}) => (
  <Tag
    {...transferProps(restProps)}
    className={styles.root}
  >
    {children}
  </Tag>
);

export const PopoverWrapperWithContext = withGlobalProps(PopoverWrapper, 'PopoverWrapper');

export default PopoverWrapperWithContext;

