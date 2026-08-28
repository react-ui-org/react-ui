import PropTypes from 'prop-types';
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
      getRootPriorityClassName(priority, styles),
      getRootColorClassName(color, styles),
    )}
  >
    {label}
  </div>
);

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
Badge.propTypes = {
  /**
   * Color to clarify importance and meaning of the badge. Implements
   * [Feedback and Neutral color collections](/docs/foundation/collections#colors).
   */
  color: PropTypes.oneOf(['success', 'warning', 'danger', 'help', 'info', 'note', 'light', 'dark']),
  /**
   * Text to be displayed.
   */
  label: PropTypes.string.isRequired,
  /**
   * Visual priority to highlight or suppress the badge.
   */
  priority: PropTypes.oneOf(['filled', 'outline']),
};

export const BadgeWithGlobalProps = withGlobalProps<BadgeProps, never>(Badge, 'Badge');

export default BadgeWithGlobalProps;
