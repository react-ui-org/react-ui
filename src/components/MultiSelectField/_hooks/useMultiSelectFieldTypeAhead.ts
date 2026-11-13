import {
  useEffect,
  useRef,
} from 'react';
import { getTypeAheadIndex } from '../_helpers/getTypeAheadIndex';
import type {
  FlatOption,
  MultiSelectFieldTypeAhead,
} from '../MultiSelectField.types';

// Time in milliseconds after which characters typed into the non-editable combobox start a new search
const TYPE_AHEAD_TIMEOUT = 500;

/**
 * Type-ahead for the non-editable combobox. Characters typed in quick succession form a search string
 * that moves the active option to the first matching one, like a native select.
 *
 * @param options Displayed options, flattened.
 * @param activeOptionIndex Index of the active option, `-1` when no option is active.
 * @param onTypeAhead Called with the key of the matched option, or `null` when nothing matches.
 */
export const useMultiSelectFieldTypeAhead = (
  options: FlatOption[],
  activeOptionIndex: number,
  onTypeAhead: (matchedKey: FlatOption['key'] | null) => void,
): MultiSelectFieldTypeAhead => {
  // Characters typed in quick succession into the non-editable combobox, see `typeAhead`
  const typeAheadStringRef = useRef('');
  const typeAheadTimeoutRef = useRef<number | undefined>(undefined);

  /**
   * Finds the option matching the characters typed in quick succession and reports it through `onTypeAhead`.
   * Follows the APG select-only combobox example.
   *
   * @param character Character typed by the user.
   */
  const typeAhead = (character: string) => {
    window.clearTimeout(typeAheadTimeoutRef.current);

    const searchString = typeAheadStringRef.current + character;
    const index = getTypeAheadIndex(options, searchString, activeOptionIndex);

    if (index === -1) {
      typeAheadStringRef.current = '';
      onTypeAhead(null);
      return;
    }

    onTypeAhead(options[index].key);
    typeAheadStringRef.current = searchString;
    typeAheadTimeoutRef.current = window.setTimeout(() => {
      typeAheadStringRef.current = '';
    }, TYPE_AHEAD_TIMEOUT);
  };

  // Pending type-ahead reset must not fire after the field is unmounted
  useEffect(() => () => {
    window.clearTimeout(typeAheadTimeoutRef.current);
  }, []);

  return {
    /** Whether characters are being collected for a type-ahead search. */
    isTypingAhead: () => typeAheadStringRef.current !== '',
    typeAhead,
  };
};
