import type { ReactNode } from 'react';

/**
 * Props of the `MultiSelectFieldDropdownItem` component.
 */
export type MultiSelectFieldDropdownItemProps = {
  children: ReactNode;
  disabled: boolean;
  id?: string;
  isSelected: boolean;
  isWithinGroup: boolean;
  onCloseDropdown: () => void;
  onFocus: () => void;
  onFocusNextDropdownItem: () => void;
  onFocusPreviousDropdownItem: () => void;
  onSelectDropdownItem: () => void;
};
