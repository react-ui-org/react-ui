import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Badge.scss';
import { BadgeProps } from './Badge.types';

export const Badge: React.FunctionComponent<BadgeProps> = ({
  color = 'note',
  label,
  priority = 'filled',
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      priority === 'outline' && styles.isRootPriorityOutline,
      getRootColorClassName(color, styles),
    )}
  >
    {label}
  </div>
);

export const BadgeWithGlobalProps = withGlobalProps(Badge, 'Badge');

export default BadgeWithGlobalProps;
