/** @import { Option } from '../_searchAlgorithms/genericSearch' */

/**
 * Creates a map of option values to option labels.
 *
 * Grouped options are flattened, so the map contains the values and labels of all
 * individual options regardless of grouping.
 *
 * @param {Option[]} options
 * @returns {Object<string, string>}
 */
export const getOptionsLabelMap = (options) => {
  const optionsMap = {};

  options.forEach((option) => {
    if (option.options) {
      option.options.forEach((subOption) => {
        optionsMap[subOption.value] = subOption.label;
      });
    } else {
      optionsMap[option.value] = option.label;
    }
  });

  return optionsMap;
};
