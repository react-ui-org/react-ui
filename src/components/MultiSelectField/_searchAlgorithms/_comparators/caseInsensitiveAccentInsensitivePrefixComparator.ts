import { removeAccent } from '../_helpers/removeAccent';
import type { GenericSearchComparator } from '../genericSearch.types';

/**
 * Compares if the option label starts with the search value, ignoring case and accents.
 */
export const caseInsensitiveAccentInsensitivePrefixComparator: GenericSearchComparator = (
  optionLabel,
  searchValue,
) => {
  const optionLabelTransformed = removeAccent(optionLabel.toLowerCase());
  const searchValueTransformed = removeAccent(searchValue.toLowerCase());

  return optionLabelTransformed.startsWith(searchValueTransformed);
};
