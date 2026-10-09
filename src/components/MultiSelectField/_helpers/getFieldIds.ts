import type { MultiSelectFieldOption } from '../MultiSelectField.types';

/**
 * Derives IDs of the field and its inner elements from a single prefix, so the ARIA
 * references between them are always complete.
 */
export const getFieldIds = (prefix: string) => ({
  dropdown: `${prefix}__dropdown`,
  helpText: `${prefix}__helpText`,
  input: prefix,
  // Whitespace is encoded as ID references such as `aria-activedescendant` cannot contain it.
  item: (key: NonNullable<MultiSelectFieldOption['key']> | MultiSelectFieldOption['value']) => (
    `${prefix}__item__${String(key).replace(/\s/g, encodeURIComponent)}`
  ),
  label: `${prefix}__label`,
  labelText: `${prefix}__labelText`,
  tagDescription: `${prefix}__tagDescription`,
  validationText: `${prefix}__validationText`,
});
