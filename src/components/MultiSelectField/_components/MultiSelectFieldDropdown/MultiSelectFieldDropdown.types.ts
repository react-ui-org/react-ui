import type {
  FlatOption,
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../../MultiSelectField.types';

/**
 * Props of the `MultiSelectFieldDropdown` component.
 */
export type MultiSelectFieldDropdownProps = {
  activeOptionKey?: FlatOption['key'];
  disabled: boolean;
  /** Gets the ID of the heading of an option group from its key, the group is labelled by it. */
  getGroupId: (key: MultiSelectFieldOptionGroup['label']) => string;
  /** Gets the ID of an option from its key, the ID is referenced by `aria-activedescendant`. */
  getOptionId: (key: FlatOption['key']) => string;
  id: string;
  labelId: string;
  /** Moves the focus back to the combobox, called after mouse interaction with the dropdown. */
  onFocusCombobox: () => void;
  /** Called with the value of the option the user selected. */
  onItemSelected: (value: MultiSelectFieldOption['value']) => void;
  options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[];
  value: MultiSelectFieldOption['value'][];
};
