import { removeAccent } from '../_helpers/removeAccent';

/**
 * Compares if the option label contains the search value, ignoring case and accents.
 *
 * @param {string} optionLabel
 * @param {string} searchValue
 * @returns {boolean}
 */
export const caseInsensitiveAccentInsensitiveSubstringComparator = (optionLabel, searchValue) => {
  const optionLabelTransformed = removeAccent(optionLabel.toLowerCase());
  const searchValueTransformed = removeAccent(searchValue.toLowerCase());

  return optionLabelTransformed.includes(searchValueTransformed);
};
