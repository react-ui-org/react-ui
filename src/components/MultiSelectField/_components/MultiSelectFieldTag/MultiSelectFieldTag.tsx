import React, { useContext } from 'react';
import { TranslationsContext } from '../../../../providers/translations';
import { classNames } from '../../../../helpers/classNames';
import { getRootPriorityClassName } from '../../../_helpers/getRootPriorityClassName';
import { getRootSizeClassName } from '../../../_helpers/getRootSizeClassName';
import { keyDetected } from '../../_helpers/keyDetected';
import keyBindings from '../../keyBindings';
import styles from './MultiSelectFieldTag.module.scss';
import type { MultiSelectFieldTagProps } from './MultiSelectFieldTag.types';

const MultiSelectFieldTag = React.forwardRef<HTMLDivElement, MultiSelectFieldTagProps>((
  {
    children,
    disabled,
    isFocusable,
    onCloseDropdown,
    onRemoveTag,
    priority,
    size,
  },
  ref,
) => {
  const translations = useContext(TranslationsContext);

  return (
    <div
      aria-disabled={disabled}
      className={classNames(
        styles.root,
        disabled && styles.isRootDisabled,
        getRootPriorityClassName(styles, priority),
        getRootSizeClassName(styles, size),
      )}
      onClick={(event) => {
        // Do not let the click toggle the dropdown.
        event.stopPropagation();

        if (disabled) {
          return;
        }

        onRemoveTag();
      }}
      onKeyDown={(event) => {
        if (disabled) {
          return;
        }

        if (keyDetected(event, keyBindings.closeDropdown)) {
          event.preventDefault();
          onCloseDropdown();
          return;
        }

        if (keyDetected(event, keyBindings.removeTag)) {
          event.preventDefault();
          onRemoveTag();
        }
      }}
      ref={ref}
      role="button"
      tabIndex={(isFocusable && !disabled) ? 0 : -1}
      title={disabled ? undefined : translations.MultiSelectField.removeTag}
    >
      <span>
        {children}
      </span>
      {!disabled && (
        <span aria-hidden>
          ×
        </span>
      )}
    </div>
  );
});

export default MultiSelectFieldTag;
