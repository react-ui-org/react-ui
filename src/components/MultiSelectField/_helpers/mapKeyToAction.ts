import type {
  KeyAction,
  KeyActionContext,
  KeyActionEvent,
} from '../MultiSelectField.types';

/**
 * Maps a key pressed in the combobox to an action.
 *
 * DOM focus stays on the combobox the whole time, navigating options only changes
 * `aria-activedescendant`. Space is left for typing while the search text is not empty.
 *
 * Modelled on `mapComboboxInputKeyToAction` of Spirit Design System (MIT License),
 * https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/gridKeyboardNavigation.ts
 *
 * @param event Pressed key and its modifiers.
 * @param context State of the field the action depends on.
 * @returns Action to perform, `null` when the key is left to the browser.
 */
export const mapKeyToAction = (
  {
    altKey = false,
    ctrlKey = false,
    key,
    metaKey = false,
    shiftKey = false,
  }: KeyActionEvent,
  {
    hasActiveOption,
    hasTags,
    isCaretAtStart,
    isEditable,
    isOpen,
    isSearchEmpty,
    isTypingAhead,
  }: KeyActionContext,
): KeyAction | null => {
  const hasModifier = altKey || ctrlKey || metaKey || shiftKey;
  const isPrintable = key.length === 1 && !altKey && !ctrlKey && !metaKey;
  const isSpace = key === ' ';

  // Backspace moves to the last tag from an empty search text. Without search, the search text is always empty.
  if (key === 'Backspace') {
    return (!hasModifier && isSearchEmpty && hasTags) ? 'focusLastTag' : null;
  }

  // Arrow Left deactivates the active option in the editable input. Without an editable input there is nothing to
  // deactivate, the key is left alone while an option is active.
  if (key === 'ArrowLeft') {
    if (hasActiveOption) {
      return isEditable ? 'deactivate' : null;
    }

    return (!hasModifier && isCaretAtStart && hasTags) ? 'focusLastTag' : null;
  }

  // Arrow Right returns to editing the search text, the browser moves the cursor.
  if (key === 'ArrowRight') {
    return (isEditable && hasActiveOption) ? 'deactivate' : null;
  }

  // Alt + Arrow Down opens the dropdown without activating an option, Alt + Arrow Up closes it.
  if (altKey && key === 'ArrowDown') {
    return isOpen ? null : 'open';
  }

  if (altKey && key === 'ArrowUp') {
    return isOpen ? 'close' : null;
  }

  // Without an editable input, typing moves to the matching option like in a native select.
  // Space continues a type-ahead search, e.g. "Czech R".
  if (!isEditable && isPrintable && (!isSpace || isTypingAhead)) {
    return 'typeAhead';
  }

  if (!isOpen) {
    switch (key) {
      case 'ArrowDown':
        return 'openAndActivateFirst';
      case 'ArrowUp':
        return 'openAndActivateLast';
      case 'Enter':
        return 'open';
      // Without an editable input, Home and End do not need to move the text cursor.
      case 'Home':
        return isEditable ? null : 'openAndActivateFirst';
      case 'End':
        return isEditable ? null : 'openAndActivateLast';
      // A leading space is never a useful search, so it opens the dropdown instead of typing.
      case ' ':
        return (!isEditable || isSearchEmpty) ? 'open' : null;
      default:
        return null;
    }
  }

  switch (key) {
    case 'Escape':
      return 'close';
    case 'ArrowDown':
      return hasActiveOption ? 'activateNext' : 'activateFirst';
    case 'ArrowUp':
      return hasActiveOption ? 'activatePrevious' : 'activateLast';
    // In the editable input, Home and End move the cursor within the search text until an option is active.
    case 'Home':
      return (hasActiveOption || !isEditable) ? 'activateFirst' : null;
    case 'End':
      return (hasActiveOption || !isEditable) ? 'activateLast' : null;
    // Enter never submits a surrounding form, it toggles the active option when there is one.
    case 'Enter':
      return hasActiveOption ? 'toggleActive' : 'noop';
    case ' ':
      if (hasActiveOption && (!isEditable || isSearchEmpty)) {
        return 'toggleActive';
      }

      // Space never submits a form or scrolls the page, it types into a non-empty search text.
      return (!isEditable || isSearchEmpty) ? 'noop' : null;
    default:
      return null;
  }
};
