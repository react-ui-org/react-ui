/**
 * @typedef {Object} Option
 * @property {string} label - The label of the option.
 * @property {string} value - The value associated with the option.
 * @property {Option[]} [options] - Optional nested sub-options.
 */

/**
 * Generic search algorithm that filters options based on a search string and a comparator function.
 *
 * Grouped options are filtered by the labels of the options inside the groups. Groups with
 * no matching options are omitted.
 *
 * @param {Option[]} options
 * @param {string} searchString
 * @param {function(string, string): boolean} comparator
 * @returns {Option[]}
 */
export const genericSearch = (options, searchString, comparator) => {
  const result = [];

  options
    .forEach((option) => {
      // Grouped options are filtered by the labels of the options inside the group
      if (option.options) {
        const matchingOptions = option.options
          .filter((groupOption) => comparator(groupOption.label, searchString));

        // If no options match the search string, skip the whole group
        if (matchingOptions.length === 0) {
          return;
        }

        result.push({
          ...option,
          options: matchingOptions,
        });

        return;
      }

      // Individual options are filtered by their own labels
      if (!comparator(option.label, searchString)) {
        return;
      }

      result.push(option);
    });

  return result;
};
