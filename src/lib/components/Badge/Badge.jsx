import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import styles from './Badge.scss';

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
      priority === 'outline' && styles.isRootPriorityOutline,
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
   * [Color variant](/foundation/colors#component-colors) to clarify importance and meaning of the badge.
   */
  color: PropTypes.oneOf(
    ['primary', 'secondary', 'success', 'warning', 'danger', 'help', 'info', 'note', 'light', 'dark'],
  ),
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
