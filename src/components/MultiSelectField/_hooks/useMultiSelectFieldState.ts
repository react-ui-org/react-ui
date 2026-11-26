import {
  useCallback, useMemo, useState,
} from 'react';
import { flattenOptions } from '../_helpers/flattenOptions';
import { getNextEnabledIndex } from '../_helpers/getNextEnabledIndex';
import type {
  FlatOption,
  IndexMove,
  MultiSelectFieldOption,
  MultiSelectFieldState,
  UseMultiSelectFieldStateParams,
} from '../MultiSelectField.types';

/**
 * State of the field: the dropdown, the search text, the active option and the value changes made by the user.
 */
export const useMultiSelectFieldState = ({
  isDisabled,
  onChange,
  options,
  searchAlgorithm,
  value,
}: UseMultiSelectFieldStateParams): MultiSelectFieldState => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [search, setSearch] = useState('');
  // Key of the active option. The key, not the index, is kept so the active option survives changes of the
  // displayed options, see `activeOption`.
  const [activeOptionKey, setActiveOptionKey] = useState<FlatOption['key'] | null>(null);

  const isSearchEnabled = searchAlgorithm != null;
  // Searching and flattening walk all options, so they run only when their inputs change, not on every render.
  const displayedOptions = useMemo(() => ((isSearchEnabled && search.length > 0)
    ? searchAlgorithm(options, search)
    : options), [isSearchEnabled, options, search, searchAlgorithm]);
  const flatOptions = useMemo(
    () => flattenOptions(displayedOptions, isDisabled),
    [displayedOptions, isDisabled],
  );
  // Only a displayed, enabled option can be active. The option is no longer active when it is filtered out
  // or disabled.
  const activeOption = flatOptions.find((option) => option.key === activeOptionKey && !option.disabled);
  const activeOptionIndex = activeOption ? flatOptions.indexOf(activeOption) : -1;

  /**
   * Gets the key of the option reached by the move from the given index.
   *
   * @param currentIndex Index the move starts from.
   * @param move Direction of the move.
   * @returns Key of the reached option, `null` when no option is enabled.
   */
  const getOptionKeyAfterMove = (currentIndex: number, move: IndexMove) => {
    const index = getNextEnabledIndex(
      currentIndex,
      flatOptions.length,
      move,
      (optionIndex) => flatOptions[optionIndex].disabled,
    );

    return index === -1 ? null : flatOptions[index].key;
  };

  /**
   * Makes the option reached by the move the active one. `first` and `last` ignore the active option,
   * `next` and `previous` move from it.
   *
   * @param move Direction of the move.
   */
  const activate = (move: IndexMove) => {
    const fromIndex = (move === 'first' || move === 'last') ? -1 : activeOptionIndex;

    setActiveOptionKey(getOptionKeyAfterMove(fromIndex, move));
  };

  /**
   * Opens the dropdown and makes the type-ahead match the active option.
   *
   * @param key Key of the matched option, the active option is kept when `null`.
   */
  const activateTypeAheadMatch = (key: FlatOption['key'] | null) => {
    setIsDropdownOpen(true);

    if (key !== null) {
      setActiveOptionKey(key);
    }
  };

  /** Removes the active option, the dropdown stays as it is. */
  const deactivate = () => {
    setActiveOptionKey(null);
  };

  /**
   * Opens the dropdown and optionally makes an option active.
   *
   * @param activeOptionMove Move that selects the active option. `first` and `last` pick the first or last
   * enabled option.
   */
  const openDropdown = (activeOptionMove?: IndexMove) => {
    setIsDropdownOpen(true);
    setActiveOptionKey(activeOptionMove ? getOptionKeyAfterMove(-1, activeOptionMove) : null);
  };

  /** Closes the dropdown, clears the active option and the search text. */
  const closeDropdown = useCallback(() => {
    setIsDropdownOpen(false);
    setActiveOptionKey(null);
    setSearch('');
  }, []);

  /**
   * Updates the search text. The active option is cleared because the displayed options change.
   *
   * @param text New search text.
   */
  const changeSearch = (text: string) => {
    setSearch(text);
    setActiveOptionKey(null);

    // Typing into the input opens the dropdown.
    setIsDropdownOpen(true);
  };

  /**
   * Removes the value at the given index.
   *
   * @param index Index of the value to remove.
   */
  const removeValue = (index: number) => {
    onChange(value.filter((_, otherIndex) => otherIndex !== index));
  };

  /**
   * Adds the option value to the selection, or removes it when it is already selected.
   *
   * @param optionValue Value of the option to toggle.
   */
  const toggleValue = (optionValue: MultiSelectFieldOption['value']) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((otherValue) => otherValue !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }

    // The search has served its purpose, so it is cleared to let the user search for another option.
    // The active option is kept.
    setSearch('');
  };

  return {
    activate,
    activateTypeAheadMatch,
    activeOption,
    activeOptionIndex,
    changeSearch,
    closeDropdown,
    deactivate,
    displayedOptions,
    flatOptions,
    isDropdownOpen,
    isSearchEnabled,
    openDropdown,
    removeValue,
    search,
    toggleValue,
  };
};
