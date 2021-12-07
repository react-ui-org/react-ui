import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './ButtonGroup.scss';
import { ButtonGroupContext } from './ButtonGroupContext';

export const ButtonGroup = ({
  block,
  disabled,
  children,
  priority,
  size,
  ...restProps
}) => (
  <div
    className={classNames(
      styles.root,
      block && styles.isRootBlock,
    )}
    role="group"
    {...restProps}
  >
    <ButtonGroupContext.Provider
      value={{
        block,
        disabled,
        priority,
        size,
      }}
    >
      {children}
    </ButtonGroupContext.Provider>
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
  children: PropTypes.node.isRequired,
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

export const ButtonGroupWithContext = withProviderContext(ButtonGroup, 'ButtonGroup');

export default ButtonGroupWithContext;
