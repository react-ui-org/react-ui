import type { GenericSearchComparator } from '../genericSearch.types';

/**
 * Compares if the option label contains the search value, ignoring case and considering accents.
 */
export const caseInsensitiveAccentSensitiveSubstringComparator: GenericSearchComparator = (
  optionLabel,
  searchValue,
) => {
  const optionLabelTransformed = optionLabel.toLowerCase();
  const searchValueTransformed = searchValue.toLowerCase();

  return optionLabelTransformed.includes(searchValueTransformed);
};
