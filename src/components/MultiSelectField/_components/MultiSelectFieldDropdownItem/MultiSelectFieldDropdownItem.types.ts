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
  onSelectDropdownItem: () => void;
};
