import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../jsHelpers/classNames/classNames';
import { transferProps } from '../../jsHelpers/transferProps/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import styles from './Badge.module.scss';

export const Badge = ({
  color,
  label,
  priority,
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

Badge.defaultProps = {
  color: 'note',
  priority: 'filled',
};

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

export const BadgeWithGlobalProps = withGlobalProps(Badge, 'Badge');

export default BadgeWithGlobalProps;
