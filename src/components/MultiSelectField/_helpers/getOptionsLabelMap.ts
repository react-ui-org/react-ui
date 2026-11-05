import type {
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../MultiSelectField.types';

/**
 * Creates a map of option values to option labels.
 *
 * Grouped options are flattened, so the map contains the values and labels of all
 * individual options regardless of grouping. A `Map` is used so that any value,
 * including `'__proto__'`, is a safe key.
 *
 * @param options Individual or grouped options.
 * @returns Labels of the options keyed by their values.
 */
export const getOptionsLabelMap = (options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[]) => {
  const optionsMap = new Map<MultiSelectFieldOption['value'], MultiSelectFieldOption['label']>();

  options.forEach((option) => {
    if ('options' in option) {
      option.options.forEach((subOption) => {
        optionsMap.set(subOption.value, subOption.label);
      });
    } else {
      optionsMap.set(option.value, option.label);
    }
  });

  return optionsMap;
};
