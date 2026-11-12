import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import styles from './Badge.module.scss';
import type { BadgeProps } from './Badge.types';

export const Badge: React.FunctionComponent<BadgeProps> = ({
  color = 'note',
  label,
  priority = 'filled',
  ...restProps
}: BadgeProps) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      getRootPriorityClassName(styles, priority),
      getRootColorClassName(styles, color),
    )}
  >
    {label}
  </div>
);

export const BadgeWithGlobalProps = withGlobalProps<BadgeProps, never>(Badge, 'Badge');

export default BadgeWithGlobalProps;
