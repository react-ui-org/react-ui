import PropTypes from 'prop-types';
import React from 'react';
import styles from './ButtonGroup.scss';

export const ButtonGroup = (props) => {
  const {
    block,
    disabled,
    children,
    priority,
    size,
    ...other
  } = props;

  let blockClass = '';
  if (block) {
    blockClass = styles.isRootBlock;
  }

  return (
    <div
      className={`
        ${styles.root}
        ${blockClass}
      `.trim()}
      role="group"
      {...other}
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
};

ButtonGroup.defaultProps = {
  block: false,
  disabled: false,
  priority: 'default',
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
  priority: PropTypes.oneOf(['default', 'outline', 'flat']),
  /**
   * Size of the buttons.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default ButtonGroup;
