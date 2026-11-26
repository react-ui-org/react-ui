import type { ReactNode } from 'react';

/**
 * Props of the `MultiSelectFieldDropdownItem` component.
 */
export type MultiSelectFieldDropdownItemProps = {
  children: ReactNode;
  disabled: boolean;
  id: string;
  isActive: boolean;
  isSelected: boolean;
  isWithinGroup: boolean;
  /** Called when the user clicks an enabled option. */
  onSelectDropdownItem: () => void;
};
