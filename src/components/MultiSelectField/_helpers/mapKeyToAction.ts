import type { KeyDetectedEvent } from './keyDetected.types';
import type {
  KeyAction,
  KeyActionContext,
} from './mapKeyToAction.types';

/**
 * Maps a key pressed in the combobox input to an action.
 *
 * DOM focus stays on the input the whole time, navigating options only changes
 * `aria-activedescendant`. Space is left for typing while search is enabled.
 *
 * Modelled on `mapComboboxInputKeyToAction` of Spirit Design System (MIT License),
 * https://github.com/alma-oss/spirit-design-system/blob/main/packages/web-react/src/hooks/gridKeyboardNavigation.ts
 */
export const mapKeyToAction = (
  {
    altKey = false,
    ctrlKey = false,
    key,
    metaKey = false,
  }: Pick<KeyDetectedEvent, 'altKey' | 'ctrlKey' | 'key' | 'metaKey'>,
  {
    canFocusLastTag,
    hasActiveOption,
    isEditable,
    isOpen,
  }: KeyActionContext,
): KeyAction | null => {
  if (key === 'Backspace') {
    return canFocusLastTag ? 'focusLastTag' : null;
  }

  // Alt + Arrow Down opens the dropdown without activating an option, Alt + Arrow Up closes it.
  if (altKey && (key === 'ArrowDown' || key === 'ArrowUp')) {
    if (key === 'ArrowDown') {
      return isOpen ? null : 'open';
    }

    return isOpen ? 'close' : null;
  }

  // Without an editable input, typing moves to the matching option like in a native select.
  if (!isEditable && key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey) {
    return 'typeAhead';
  }

  const isSelectKey = key === 'Enter' || (key === ' ' && !isEditable);

  if (!isOpen) {
    if (key === 'ArrowDown') {
      return 'openAndActivateFirst';
    }

    if (key === 'ArrowUp') {
      return 'openAndActivateLast';
    }

    // Without an editable input, Home and End do not need to move the text cursor.
    if (!isEditable && key === 'Home') {
      return 'openAndActivateFirst';
    }

    if (!isEditable && key === 'End') {
      return 'openAndActivateLast';
    }

    return isSelectKey ? 'open' : null;
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
    // Arrow Left and Arrow Right return to editing the search text, the browser moves the cursor.
    case 'ArrowLeft':
    case 'ArrowRight':
      return (isEditable && hasActiveOption) ? 'deactivate' : null;
    default:
      return (isSelectKey && hasActiveOption) ? 'toggleActive' : null;
  }
};
