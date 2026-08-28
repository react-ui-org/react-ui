/**
 * Compares if the option label contains the search value, ignoring case and considering accents.
 *
 * @param {string} optionLabel
 * @param {string} searchValue
 * @returns {boolean}
 */
export const caseInsensitiveAccentSensitiveSubstringComparator = (optionLabel, searchValue) => {
  const optionLabelTransformed = optionLabel.toLowerCase();
  const searchValueTransformed = searchValue.toLowerCase();

  return optionLabelTransformed.includes(searchValueTransformed);
};
