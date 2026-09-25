import type {
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../MultiSelectField.types';
import type { FlatOption } from './flattenOptions.types';

/**
 * Creates a single ordered list of options in the order they are displayed.
 *
 * Grouped options are flattened and inherit the disabled state of their group
 * and of the whole field, so keyboard navigation never needs to query the DOM.
 */
export const flattenOptions = (
  options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[],
  isFieldDisabled = false,
): FlatOption[] => options.flatMap((option) => {
  const toFlatOption = (item: MultiSelectFieldOption, isGroupDisabled: boolean): FlatOption => ({
    disabled: isFieldDisabled || isGroupDisabled || (item.disabled ?? false),
    key: item.key ?? item.value,
    value: item.value,
  });

  if ('options' in option) {
    return option.options.map((groupOption) => toFlatOption(groupOption, option.disabled ?? false));
  }

  return [toFlatOption(option, false)];
});
