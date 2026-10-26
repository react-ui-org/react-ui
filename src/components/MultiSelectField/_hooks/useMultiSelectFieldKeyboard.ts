import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { isCaretAtStart } from '../_helpers/isCaretAtStart';
import { mapKeyToAction } from '../_helpers/mapKeyToAction';
import type {
  MultiSelectFieldKeyboard,
  TagKeyAction,
  UseMultiSelectFieldKeyboardParams,
} from '../MultiSelectField.types';
import { useMultiSelectFieldTypeAhead } from './useMultiSelectFieldTypeAhead';

/**
 * Keyboard handling of the field. It also owns the focus management the keys need, i.e. focusing the combobox
 * and the tags, registering the tags and removing a tag.
 */
export const useMultiSelectFieldKeyboard = ({
  comboboxRef,
  isDisabled,
  state,
  value,
}: UseMultiSelectFieldKeyboardParams): MultiSelectFieldKeyboard => {
  const tagsRef = useRef<(HTMLDivElement | null)[]>([]);
  const {
    activate,
    activeOption,
    activeOptionIndex,
    activateTypeAheadMatch,
    changeSearch,
    closeDropdown,
    deactivate,
    flatOptions,
    isDropdownOpen,
    isSearchEnabled,
    openDropdown,
    removeValue,
    search,
    toggleValue,
  } = state;
  const typeAhead = useMultiSelectFieldTypeAhead(flatOptions, activeOptionIndex, activateTypeAheadMatch);

  /** Moves the focus to the combobox. */
  const focusCombobox = () => {
    comboboxRef.current?.focus();
  };

  /**
   * Moves the focus to the tag at the given index.
   *
   * @param index Index of the tag.
   */
  const focusTag = (index: number) => {
    tagsRef.current[index]?.focus();
  };

  /**
   * Stores the element of the tag at the given index, so the tag can be focused by its index.
   *
   * @param index Index of the tag.
   * @param element Rendered tag element, `null` when the tag is unmounted.
   */
  const registerTag = (index: number, element: HTMLDivElement | null) => {
    tagsRef.current[index] = element;
  };

  /**
   * Removes the value of the tag at the given index and moves the focus to a neighbouring tag.
   *
   * @param index Index of the tag to remove.
   */
  const removeTag = (index: number) => {
    removeValue(index);

    // Move focus to the previous tag, or to the next one when the first tag was removed.
    // The next tag takes the index of the removed one.
    if (index > 0) {
      focusTag(index - 1);
    } else if (value.length > 1) {
      focusTag(1);
    } else {
      focusCombobox();
    }
  };

  /**
   * Handles a key press on the combobox. Maps the key to an action and performs it. Keys the field does not
   * handle are left to the browser.
   *
   * @param event Keyboard event of the combobox.
   */
  const handleComboboxKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (isDisabled || event.nativeEvent.isComposing || event.key === 'Process' || event.key === 'Dead') {
      return;
    }

    const action = mapKeyToAction(event, {
      hasActiveOption: activeOption != null,
      hasTags: value.length > 0,
      isCaretAtStart: isCaretAtStart(comboboxRef.current),
      isEditable: isSearchEnabled,
      isOpen: isDropdownOpen,
      isSearchEmpty: search.length === 0,
      isTypingAhead: typeAhead.isTypingAhead(),
    });

    if (action == null) {
      return;
    }

    // The browser still moves the cursor within the search text.
    if (action === 'deactivate') {
      deactivate();
      return;
    }

    event.preventDefault();

    switch (action) {
      case 'open':
        openDropdown();
        break;
      case 'openAndActivateFirst':
        openDropdown('first');
        break;
      case 'openAndActivateLast':
        openDropdown('last');
        break;
      case 'close':
        closeDropdown();
        break;
      case 'activateFirst':
        activate('first');
        break;
      case 'activateLast':
        activate('last');
        break;
      case 'activateNext':
        activate('next');
        break;
      case 'activatePrevious':
        activate('previous');
        break;
      case 'toggleActive':
        if (activeOption) {
          toggleValue(activeOption.value);
        }
        break;
      case 'focusLastTag':
        closeDropdown();
        focusTag(value.length - 1);
        break;
      case 'typeAhead':
        typeAhead.typeAhead(event.key);
        break;
      default:
        // `noop`: Enter without an active option only prevents the form submission.
        break;
    }
  };

  /**
   * Performs the action of a key press on a tag. Printable characters and Tab are passed to the combobox.
   *
   * @param action Action mapped from the key, `null` when the key is not handled by the tag.
   * @param event Keyboard event of the tag.
   * @param index Index of the tag.
   */
  const handleTagKeyAction = (
    action: TagKeyAction | null,
    event: KeyboardEvent<HTMLDivElement>,
    index: number,
  ) => {
    if (action == null) {
      // Tab moves the focus out of the field from the combobox, so the combobox gets focus first and the
      // browser continues from there.
      if (event.key === 'Tab') {
        focusCombobox();
      } else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) {
        focusCombobox();

        // Printable characters start type-ahead, or go into the search text. Space would only start the search
        // text with a space, so it opens the dropdown like on the combobox. The search text is empty while a tag
        // is focused, so the character becomes the search text, which does not rely on the browser inserting
        // it into the input focused during the key press.
        if (!isSearchEnabled || event.key === ' ') {
          handleComboboxKeyDown(event);
        } else {
          event.preventDefault();
          changeSearch(event.key);
        }
      }

      return;
    }

    event.preventDefault();

    switch (action) {
      case 'focusCombobox':
        focusCombobox();
        break;
      case 'focusFirst':
        focusTag(0);
        break;
      case 'focusLast':
        focusTag(value.length - 1);
        break;
      case 'focusPrevious':
        if (index > 0) {
          focusTag(index - 1);
        }
        break;
      case 'focusNext':
        if (index < value.length - 1) {
          focusTag(index + 1);
        } else {
          // The caret goes to the start of the search text, the first position a user returning from the tags expects.
          focusCombobox();

          if (comboboxRef.current instanceof HTMLInputElement) {
            comboboxRef.current.setSelectionRange(0, 0);
          }
        }
        break;
      case 'openFirst':
        focusCombobox();
        openDropdown('first');
        break;
      case 'openLast':
        focusCombobox();
        openDropdown('last');
        break;
      case 'remove':
        removeTag(index);
        break;
      default:
        break;
    }
  };

  return {
    focusCombobox,
    handleComboboxKeyDown,
    handleTagKeyAction,
    registerTag,
    removeTag,
  };
};
