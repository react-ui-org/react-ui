import type { FlatOption } from '../../_helpers/flattenOptions.types';
import type {
  MultiSelectFieldOption,
  MultiSelectFieldOptionGroup,
} from '../../MultiSelectField.types';

/**
 * Props of the `MultiSelectFieldDropdown` component.
 */
export type MultiSelectFieldDropdownProps = {
  activeOptionKey?: FlatOption['key'];
  disabled: boolean;
  getOptionId: (key: FlatOption['key']) => string;
  id: string;
  labelId: string;
  onItemSelected: (value: MultiSelectFieldOption['value']) => void;
  options: (MultiSelectFieldOption | MultiSelectFieldOptionGroup)[];
  value: MultiSelectFieldOption['value'][];
};
