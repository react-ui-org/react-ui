import type { Size } from '../../../../types';
import type { IndexMove } from '../../_helpers/getNextEnabledIndex.types';
import type { MultiSelectFieldVariant } from '../../MultiSelectField.types';

/**
 * Props of the `MultiSelectFieldTag` component.
 */
export type MultiSelectFieldTagProps = {
  descriptionId: string;
  disabled: boolean;
  isActive: boolean;
  label: string;
  onCloseDropdown: () => void;
  onFocus: () => void;
  onMove: (move: IndexMove) => void;
  onRemoveTag: () => void;
  priority: MultiSelectFieldVariant;
  size: Size;
};
