import PropTypes from 'prop-types';
import React from 'react';
import styles from './ButtonGroup.scss';

export const ButtonGroup = (props) => {
  const {
    block,
    children,
    disabled,
    htmlElementAttributes,
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
          ...htmlElementAttributes,
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
  htmlElementAttributes: {},
  priority: 'default',
  size: 'medium',
};

ButtonGroup.propTypes = {
  block: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  disabled: PropTypes.bool,
  htmlElementAttributes: PropTypes.shape({}),
  priority: PropTypes.oneOf(['default', 'outline', 'flat']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default ButtonGroup;
