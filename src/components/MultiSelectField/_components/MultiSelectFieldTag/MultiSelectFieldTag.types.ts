import type { KeyboardEvent } from 'react';
import type { Size } from '../../../../types';
import type {
  MultiSelectFieldVariant,
  TagKeyAction,
} from '../../MultiSelectField.types';

/**
 * Props of the `MultiSelectFieldTag` component.
 */
export type MultiSelectFieldTagProps = {
  descriptionId: string;
  disabled: boolean;
  label: string;
  /** Called when the tag receives focus. */
  onFocus: () => void;
  /** Called with the action mapped from the pressed key, `null` when the key is not handled by the tag. */
  onKeyAction: (action: TagKeyAction | null, event: KeyboardEvent<HTMLDivElement>) => void;
  /** Called when the remove button of the tag is clicked. */
  onRemoveTag: () => void;
  priority: MultiSelectFieldVariant;
  size: Size;
};
