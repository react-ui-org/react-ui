/**
 * Compares if the option label starts with the search value, ignoring case and considering accents.
 *
 * @param {string} optionLabel
 * @param {string} searchValue
 * @returns {boolean}
 */
export const caseInsensitiveAccentSensitivePrefixComparator = (optionLabel, searchValue) => {
  const optionLabelTransformed = optionLabel.toLowerCase();
  const searchValueTransformed = searchValue.toLowerCase();

  return optionLabelTransformed.startsWith(searchValueTransformed);
};
