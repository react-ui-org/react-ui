import type { GenericSearchComparator } from '../genericSearch.types';

/**
 * Compares if the option label starts with the search value, ignoring case and considering accents.
 */
export const caseInsensitiveAccentSensitivePrefixComparator: GenericSearchComparator = (
  optionLabel,
  searchValue,
) => {
  const optionLabelTransformed = optionLabel.toLowerCase();
  const searchValueTransformed = searchValue.toLowerCase();

  return optionLabelTransformed.startsWith(searchValueTransformed);
};
