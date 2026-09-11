import type { ReactNode } from 'react';
import type { Size } from '../../../../types';
import type { MultiSelectFieldVariant } from '../../MultiSelectField.types';

/**
 * Props of the `MultiSelectFieldTag` component.
 */
export type MultiSelectFieldTagProps = {
  children: ReactNode;
  disabled: boolean;
  isFocusable: boolean;
  onCloseDropdown: () => void;
  onRemoveTag: () => void;
  priority: MultiSelectFieldVariant;
  size: Size;
};
