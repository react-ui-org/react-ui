import type {
  FlatOption,
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../MultiSelectField.types';

/**
 * Creates a single ordered list of options in the order they are displayed.
 *
 * Grouped options are flattened and inherit the disabled state of their group
 * and of the whole field, so keyboard navigation never needs to query the DOM.
 *
 * @param options Individual or grouped options.
 * @param isFieldDisabled Whether the whole field is disabled.
 * @returns Flat options in the order they are displayed.
 */
export const flattenOptions = (
  options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[],
  isFieldDisabled = false,
): FlatOption[] => options.flatMap((option) => {
  /**
   * Converts an option to a flat option. The option is disabled when the field, its group or the option itself is.
   *
   * @param item Option to convert.
   * @param isGroupDisabled Whether the group of the option is disabled.
   */
  const toFlatOption = (item: MultiSelectFieldOption, isGroupDisabled: boolean): FlatOption => ({
    disabled: isFieldDisabled || isGroupDisabled || (item.disabled ?? false),
    key: item.key ?? item.value,
    label: item.label,
    value: item.value,
  });

  if ('options' in option) {
    return option.options.map((groupOption) => toFlatOption(groupOption, option.disabled ?? false));
  }

  return [toFlatOption(option, false)];
});
