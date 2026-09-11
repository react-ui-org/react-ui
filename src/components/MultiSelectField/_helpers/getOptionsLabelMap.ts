import type {
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../MultiSelectField.types';

/**
 * Creates a map of option values to option labels.
 *
 * Grouped options are flattened, so the map contains the values and labels of all
 * individual options regardless of grouping.
 */
export const getOptionsLabelMap = (options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[]) => {
  const optionsMap: Record<string, string> = {};

  options.forEach((option) => {
    if ('options' in option) {
      option.options.forEach((subOption) => {
        optionsMap[subOption.value] = subOption.label;
      });
    } else {
      optionsMap[option.value] = option.label;
    }
  });

  return optionsMap;
};
