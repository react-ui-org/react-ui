import PropTypes from 'prop-types';
import React from 'react';
import styles from './ButtonGroup.scss';

export const ButtonGroup = ({
  block,
  disabled,
  children,
  priority,
  size,
  ...restProps
}) => (
  <div
    className={[
      styles.root,
      block ? styles.isRootBlock : '',
    ].join(' ')}
    role="group"
    {...restProps}
  >
    {React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      return React.cloneElement(child, {
        block,
        disabled,
        grouped: true,
        priority,
        size,
      });
    })}
  </div>
);

ButtonGroup.defaultProps = {
  block: false,
  disabled: false,
  priority: 'filled',
  size: 'medium',
};

ButtonGroup.propTypes = {
  /**
   * If `true`, the button group will span the full width of its parent.
   */
  block: PropTypes.bool,
  /**
   * Buttons to be grouped.
   */
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  /**
   * If `true`, all buttons inside the group will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Visual priority to highlight or suppress the buttons.
   */
  priority: PropTypes.oneOf(['filled', 'outline', 'flat']),
  /**
   * Size of the buttons.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default ButtonGroup;
