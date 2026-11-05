import type {
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../../MultiSelectField.types';
import { encodeIdPart } from './encodeIdPart';

/**
 * Derives IDs of the field and its inner elements from a single prefix, so the ARIA
 * references between them are always complete.
 *
 * @param prefix ID of the field, used as the ID of the combobox and as the prefix of the other IDs.
 * @returns IDs of the inner elements and functions getting the IDs of options and groups.
 */
export const getFieldIds = (prefix: string) => ({
  dropdown: `${prefix}__dropdown`,
  /**
   * Gets the ID of the heading of an option group, referenced by `aria-labelledby` of the group.
   *
   * @param key Key of the group, the label is used when the group has no key.
   * @returns ID of the group heading.
   */
  group: (key: MultiSelectFieldOptionGroup['label']) => `${prefix}__group__${encodeIdPart(key)}`,
  helpText: `${prefix}__helpText`,
  input: prefix,
  /**
   * Gets the ID of an option, referenced by `aria-activedescendant` of the combobox.
   *
   * @param key Key of the option, the value is used when the option has no key.
   * @returns ID of the option.
   */
  item: (key: NonNullable<MultiSelectFieldOption['key']> | MultiSelectFieldOption['value']) => (
    `${prefix}__item__${encodeIdPart(key)}`
  ),
  label: `${prefix}__label`,
  labelText: `${prefix}__labelText`,
  tagDescription: `${prefix}__tagDescription`,
  validationText: `${prefix}__validationText`,
});
