import React, { useContext } from 'react';
import type {
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { TranslationsContext } from '../../../../providers/translations';
import { classNames } from '../../../../helpers/classNames';
import { getRootPriorityClassName } from '../../../_helpers/getRootPriorityClassName';
import { getRootSizeClassName } from '../../../_helpers/getRootSizeClassName';
import { mapTagKeyToAction } from '../../_helpers/mapTagKeyToAction';
import styles from './MultiSelectFieldTag.module.scss';
import type { MultiSelectFieldTagProps } from './MultiSelectFieldTag.types';

/**
 * Selected value of the field. It receives focus from the keyboard navigation of the field, and the keys
 * are reported to the parent, which decides what they do. The remove button is for pointer users only.
 */
const MultiSelectFieldTag = React.forwardRef<HTMLDivElement, MultiSelectFieldTagProps>((
  {
    descriptionId,
    disabled,
    label,
    onFocus,
    onKeyAction,
    onRemoveTag,
    priority,
    size,
  },
  ref,
) => {
  const translations = useContext(TranslationsContext);

  /**
   * Stops the click so that it does not toggle the dropdown of the field.
   *
   * @param event Click event of the tag.
   */
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  /**
   * Maps the pressed key to an action and reports it to the parent. Keys pressed on the remove button are left
   * to the button, e.g. Enter and Space click it. Keys of an IME composition are left to the browser.
   *
   * @param event Keyboard event of the tag.
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      disabled
      || event.target !== event.currentTarget
      || event.nativeEvent.isComposing
      || event.key === 'Process'
      || event.key === 'Dead'
    ) {
      return;
    }

    onKeyAction(mapTagKeyToAction(event), event);
  };

  return (
    // The tag receives focus itself, the keys are handled here and the parent decides what they do. Disabled, it
    // is intentionally not focusable.
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      aria-describedby={disabled ? undefined : descriptionId}
      aria-disabled={disabled}
      aria-label={label}
      className={classNames(
        styles.root,
        disabled && styles.isRootDisabled,
        getRootPriorityClassName(styles, priority),
        getRootSizeClassName(styles, size),
      )}
      onClick={handleClick}
      onFocus={onFocus}
      onKeyDown={handleKeyDown}
      ref={ref}
      role="gridcell"
      // The tag is focused by the keys of the field, or by a click. Disabled, it is not focusable at all.
      tabIndex={disabled ? undefined : -1}
    >
      <span>
        {label}
      </span>
      {!disabled && (
        <button
          aria-label={`${translations.MultiSelectField.removeTag} ${label}`}
          className={styles.removeButton}
          onClick={onRemoveTag}
          // The remove button is pointer only, the keyboard removes a tag with Delete or Backspace.
          tabIndex={-1}
          type="button"
        >
          <span aria-hidden>
            ×
          </span>
        </button>
      )}
    </div>
  );
});

export default MultiSelectFieldTag;
