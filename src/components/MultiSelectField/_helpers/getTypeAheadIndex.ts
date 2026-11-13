import type { TypeAheadOption } from '../MultiSelectField.types';

/**
 * Get the index of the first enabled option whose label starts with the search string, ignoring case.
 *
 * A single character searches from the option after the active one, so pressing it repeatedly cycles through
 * the options starting with it. A longer search string continues a search that already activated an option,
 * so it starts at the active option and keeps it while its label still matches, like a native select.
 * When the search string is a single character repeated, e.g. `ccc`, and no label starts with it,
 * options starting with that character are cycled through instead. The search wraps around.
 * Returns `-1` when no option matches.
 *
 * Follows the type-ahead behavior of the APG select-only combobox example,
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 *
 * @param options Displayed options in their order.
 * @param searchString Characters typed in quick succession.
 * @param activeIndex Index of the active option, `-1` when no option is active.
 * @returns Index of the matched option, `-1` when none matches.
 */
export const getTypeAheadIndex = (
  options: TypeAheadOption[],
  searchString: string,
  activeIndex: number,
): number => {
  /**
   * Finds the first enabled option whose label starts with the prefix, searching from `startIndex` and wrapping.
   *
   * @param prefix Prefix to match, compared case-insensitively.
   * @param startIndex Index the search starts at.
   * @returns Index of the matched option, `-1` when none matches.
   */
  const findIndex = (prefix: string, startIndex: number) => {
    const normalizedPrefix = prefix.toLowerCase();

    for (let offset = 0; offset < options.length; offset += 1) {
      const index = (startIndex + offset) % options.length;
      const option = options[index];

      if (!option.disabled && option.label.toLowerCase().startsWith(normalizedPrefix)) {
        return index;
      }
    }

    return -1;
  };

  const nextIndex = activeIndex + 1;
  const index = findIndex(searchString, searchString.length > 1 ? Math.max(activeIndex, 0) : nextIndex);
  const isRepeatedCharacter = [...searchString].every((character) => character === searchString[0]);

  if (index === -1 && isRepeatedCharacter && searchString.length > 1) {
    return findIndex(searchString[0], nextIndex);
  }

  return index;
};
