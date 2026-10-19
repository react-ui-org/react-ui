import React from 'react';
import { classNames } from '../../../../helpers/classNames';
import { keyDetected } from '../../_helpers/keyDetected';
import keyBindings from '../../keyBindings';
import styles from './MultiSelectFieldDropdownItem.module.scss';
import type { MultiSelectFieldDropdownItemProps } from './MultiSelectFieldDropdownItem.types';

const MultiSelectFieldDropdownItem = React.forwardRef<HTMLDivElement, MultiSelectFieldDropdownItemProps>((
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

export default MultiSelectFieldDropdownItem;
