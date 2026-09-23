import { removeAccent } from '../_helpers/removeAccent';
import type { GenericSearchComparator } from '../genericSearch.types';

/**
 * Compares if the option label contains the search value, ignoring case and accents.
 */
export const caseInsensitiveAccentInsensitiveSubstringComparator: GenericSearchComparator = (
  optionLabel,
  searchValue,
) => {
  const optionLabelTransformed = removeAccent(optionLabel.toLowerCase());
  const searchValueTransformed = removeAccent(searchValue.toLowerCase());

  return optionLabelTransformed.includes(searchValueTransformed);
};
