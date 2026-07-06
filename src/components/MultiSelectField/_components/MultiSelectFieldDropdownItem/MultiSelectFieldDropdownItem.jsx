import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../../../../helpers/classNames';
import { keyDetected } from '../../_helpers/keyDetected';
import keyBindings from '../../keyBindings';
import styles from './MultiSelectFieldDropdownItem.module.scss';

const MultiSelectFieldDropdownItem = React.forwardRef((
  {
    children,
    disabled,
    id,
    isSelected,
    isWithinGroup,
    onCloseDropdown,
    onFocus,
    onFocusNextDropdownItem,
    onFocusPreviousDropdownItem,
    onSelectDropdownItem,
  },
  ref,
) => (
  <div
    aria-disabled={disabled}
    aria-selected={isSelected}
    className={classNames(
      styles.root,
      disabled && styles.isRootDisabled,
      isSelected && styles.isRootSelected,
      isWithinGroup && styles.isRootInGroup,
    )}
    id={id}
    onClick={() => {
      if (disabled) {
        return;
      }

      onSelectDropdownItem();
    }}
    onFocus={onFocus}
    onKeyDown={(event) => {
      if (disabled) {
        return;
      }

      if (keyDetected(event, keyBindings.closeDropdown)) {
        event.preventDefault();
        onCloseDropdown();
      } else if (keyDetected(event, keyBindings.focusNextDropdownItem)) {
        event.preventDefault();
        onFocusNextDropdownItem();
      } else if (keyDetected(event, keyBindings.focusPreviousDropdownItem)) {
        event.preventDefault();
        onFocusPreviousDropdownItem();
      } else if (keyDetected(event, keyBindings.selectDropdownItem)) {
        event.preventDefault();
        onSelectDropdownItem();
      }
    }}
    ref={ref}
    role="option"
    tabIndex={-1}
  >
    {children}
  </div>
));

MultiSelectFieldDropdownItem.defaultProps = {
  id: undefined,
};

MultiSelectFieldDropdownItem.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool.isRequired,
  id: PropTypes.string,
  isSelected: PropTypes.bool.isRequired,
  isWithinGroup: PropTypes.bool.isRequired,
  onCloseDropdown: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onFocusNextDropdownItem: PropTypes.func.isRequired,
  onFocusPreviousDropdownItem: PropTypes.func.isRequired,
  onSelectDropdownItem: PropTypes.func.isRequired,
};

export default MultiSelectFieldDropdownItem;
