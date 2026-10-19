import React, { useContext } from 'react';
import { TranslationsContext } from '../../../../providers/translations';
import { keyDetected } from '../../_helpers/keyDetected';
import keyBindings from '../../keyBindings';
import styles from './MultiSelectFieldSearchInput.module.scss';
import type { MultiSelectFieldSearchInputProps } from './MultiSelectFieldSearchInput.types';

const MultiSelectFieldSearchInput = React.forwardRef<HTMLSpanElement, MultiSelectFieldSearchInputProps>((
  {
    disabled,
    id,
    isFocusable,
    onCloseDropdown,
    onFocusFirstDropdownItem,
    onFocusLastDropdownItem,
    onFocusLastTag,
    onSearchInput,
    searchValue,
  },
  ref,
) => {
  const translations = useContext(TranslationsContext);

  return (
    <span
      // `aria-labelledby` takes precedence when the `id` is set and the search input
      // is labelled by the field label
      aria-label={translations.MultiSelectField.search}
      aria-labelledby={id && `${id}__labelText`}
      className={styles.root}
      // `plaintext-only` makes the browser insert pasted or dropped content as plain text
      // to prevent inserting formatted HTML content into the editable element
      contentEditable={disabled ? false : 'plaintext-only'}
      onInput={(event) => {
        onSearchInput(event.currentTarget.textContent ?? '');
      }}
      onKeyDown={(event) => {
        if (keyDetected(event, keyBindings.closeDropdown)) {
          event.preventDefault();
          onCloseDropdown();
          return;
        }

        if (keyDetected(event, keyBindings.focusNextDropdownItem)) {
          event.preventDefault();
          onFocusFirstDropdownItem();
          return;
        }

        if (keyDetected(event, keyBindings.focusPreviousDropdownItem)) {
          event.preventDefault();
          onFocusLastDropdownItem();
          return;
        }

        if (
          keyDetected(event, keyBindings.focusLastTagOnEmptySearchInput)
          && searchValue.length === 0
        ) {
          event.preventDefault();
          onFocusLastTag();
          return;
        }

        // Prevent the default behavior of the Enter key which inserts a line break
        // into the editable element.
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
      ref={ref}
      role="textbox"
      tabIndex={isFocusable ? 0 : -1}
    />
  );
});

export default MultiSelectFieldSearchInput;
