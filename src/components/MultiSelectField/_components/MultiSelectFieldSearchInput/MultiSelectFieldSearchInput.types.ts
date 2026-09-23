/**
 * Props of the `MultiSelectFieldSearchInput` component.
 */
export type MultiSelectFieldSearchInputProps = {
  disabled: boolean;
  id?: string;
  isFocusable: boolean;
  onCloseDropdown: () => void;
  onFocusFirstDropdownItem: () => void;
  onFocusLastDropdownItem: () => void;
  onFocusLastTag: () => void;
  onSearchInput: (searchValue: string) => void;
  searchValue: string;
};
