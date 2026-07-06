import { removeAccent } from '../_helpers/removeAccent';

/**
 * Compares if the option label starts with the search value, ignoring case and accents.
 *
 * @param {string} optionLabel
 * @param {string} searchValue
 * @returns {boolean}
 */
export const caseInsensitiveAccentInsensitivePrefixComparator = (optionLabel, searchValue) => {
  const optionLabelTransformed = removeAccent(optionLabel.toLowerCase());
  const searchValueTransformed = removeAccent(searchValue.toLowerCase());

  return optionLabelTransformed.startsWith(searchValueTransformed);
};
