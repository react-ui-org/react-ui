import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './ButtonGroup.scss';
import { ButtonGroupContext } from './ButtonGroupContext';

export const ButtonGroup = ({
  block,
  disabled,
  children,
  id,
  priority,
  size,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.root,
        block && styles.isRootBlock,
      )}
      id={id}
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
};

ButtonGroup.defaultProps = {
  block: false,
  children: null,
  disabled: false,
  id: undefined,
  priority: 'filled',
  size: 'medium',
};

ButtonGroup.propTypes = {
  /**
   * If `true`, the button group will span the full width of its parent.
   */
  block: PropTypes.bool,
  /**
   * Buttons to be grouped. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * If `true`, all buttons inside the group will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Visual priority to highlight or suppress the buttons.
   */
  priority: PropTypes.oneOf(['filled', 'outline', 'flat']),
  /**
   * Size of the buttons.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export const ButtonGroupWithGlobalProps = withGlobalProps(ButtonGroup, 'ButtonGroup');

export default ButtonGroupWithGlobalProps;
