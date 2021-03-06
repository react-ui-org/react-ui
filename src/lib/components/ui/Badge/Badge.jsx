import PropTypes from 'prop-types';
import React from 'react';
import getRootColorClassName from '../../../helpers/getRootColorClassName';
import { withProviderContext } from '../../../provider';
import styles from './Badge.scss';

export const Badge = ({
  color,
  id,
  label,
  priority,
}) => (
  <div
    className={[
      styles.root,
      priority === 'outline' ? styles.rootPriorityOutline : '',
      getRootColorClassName(color, styles),
    ].join(' ')}
    id={id}
  >
    {label}
  </div>
);

Badge.defaultProps = {
  color: 'note',
  id: undefined,
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
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Text to be displayed.
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  /**
   * Visual priority to highlight or suppress the badge.
   */
  priority: PropTypes.oneOf(['filled', 'outline']),
};

export const BadgeWithContext = withProviderContext(Badge, 'Badge');

export default BadgeWithContext;
