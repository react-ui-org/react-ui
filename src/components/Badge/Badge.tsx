import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import type { BadgeProps } from './Badge.types';
import styles from './Badge.module.scss';

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
      getRootPriorityClassName(priority, styles),
      getRootColorClassName(color, styles),
    )}
  >
    {label}
  </div>
);

export const BadgeWithGlobalProps = withGlobalProps(Badge, 'Badge');

export default BadgeWithGlobalProps;
