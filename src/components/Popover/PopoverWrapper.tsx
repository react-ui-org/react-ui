import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import type { PopoverWrapperProps } from './PopoverWrapper.types';
import styles from './PopoverWrapper.module.scss';

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
