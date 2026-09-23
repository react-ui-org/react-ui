import type { RefObject } from 'react';
import type {
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../../MultiSelectField.types';

/**
 * Props of the `MultiSelectFieldDropdown` component.
 */
export type MultiSelectFieldDropdownProps = {
  autoFocusFirstOptionOnOpen: boolean;
  id?: string;
  onClose: () => void;
  onItemSelected: (value: MultiSelectFieldOption['value']) => void;
  options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[];
  optionsRef: RefObject<HTMLDivElement[]>;
  value: MultiSelectFieldOption['value'][];
};
