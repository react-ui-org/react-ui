import PropTypes from 'prop-types';
import React, {
  useMemo,
} from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootPriorityClassName } from '../_helpers/getRootPriorityClassName';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './ButtonGroup.module.scss';
import { ButtonGroupContext } from './ButtonGroupContext';

export const ButtonGroup = ({
  block,
  disabled,
  children,
  priority,
  size,
  ...restProps
}) => {
  const childProps = useMemo(() => ({
    block,
    disabled,
    priority,
    size,
  }), [block, disabled, priority, size]);

  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <fieldset
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        block && styles.isRootBlock,
        getRootPriorityClassName(priority, styles),
      )}
      disabled={disabled}
    >
      <ButtonGroupContext.Provider value={childProps}>
        {children}
      </ButtonGroupContext.Provider>
    </fieldset>
  );
};

ButtonGroup.defaultProps = {
  block: false,
  children: null,
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
   * Buttons to be grouped. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
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

export const ButtonGroupWithGlobalProps = withGlobalProps(ButtonGroup, 'ButtonGroup');

export default ButtonGroupWithGlobalProps;
