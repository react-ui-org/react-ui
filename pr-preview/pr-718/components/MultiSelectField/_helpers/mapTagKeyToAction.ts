import type {
  KeyActionEvent,
  TagKeyAction,
} from '../MultiSelectField.types';

/**
 * Maps a key pressed on a tag to an action. Tab and printable characters are not mapped, the caller
 * handles them by moving focus to the combobox. Keys with a modifier are left to the browser, e.g.
 * Alt + Arrow Left navigates back in history.
 *
 * @param event Pressed key and its modifiers.
 * @returns Action to perform, `null` when the key is not handled by the tag.
 */
export const mapTagKeyToAction = ({
  altKey = false,
  ctrlKey = false,
  key,
  metaKey = false,
  shiftKey = false,
}: KeyActionEvent): TagKeyAction | null => {
  if (altKey || ctrlKey || metaKey || shiftKey) {
    return null;
  }

  switch (key) {
    case 'ArrowLeft':
      return 'focusPrevious';
    case 'ArrowRight':
      return 'focusNext';
    case 'Home':
      return 'focusFirst';
    case 'End':
      return 'focusLast';
    case 'Backspace':
    case 'Delete':
      return 'remove';
    case 'Escape':
      return 'focusCombobox';
    case 'ArrowDown':
      return 'openFirst';
    case 'ArrowUp':
      return 'openLast';
    default:
      return null;
  }
};
