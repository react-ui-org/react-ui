import type { TypeAheadOption } from './getTypeAheadIndex.types';

/**
 * Get the index of the first enabled option whose label starts with the search string, ignoring case.
 *
 * The search starts at `startIndex` and wraps around. When the search string is a single character
 * repeated, e.g. `ccc`, and no label starts with it, options starting with that character are cycled
 * through instead. Returns `-1` when no option matches.
 *
 * Follows the type-ahead behavior of the APG select-only combobox example,
 * https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
 */
export const getTypeAheadIndex = (
  options: TypeAheadOption[],
  searchString: string,
  startIndex: number,
): number => {
  const findIndex = (prefix: string) => {
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

  const index = findIndex(searchString);
  const isRepeatedCharacter = [...searchString].every((character) => character === searchString[0]);

  if (index === -1 && isRepeatedCharacter && searchString.length > 1) {
    return findIndex(searchString[0]);
  }

  return index;
};
