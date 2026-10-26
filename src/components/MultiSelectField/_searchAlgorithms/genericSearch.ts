import type {
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../MultiSelectField.types';
import type { GenericSearchComparator } from './genericSearch.types';

/**
 * Generic search algorithm that filters options based on a search string and a comparator function.
 *
 * Grouped options are filtered by the labels of the options inside the groups. Groups with
 * no matching options are omitted.
 */
export const genericSearch = (
  options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[],
  searchString: string,
  comparator: GenericSearchComparator,
) => {
  const result: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[] = [];

  options
    .forEach((option) => {
      // Grouped options are filtered by the labels of the options inside the group
      if ('options' in option) {
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
