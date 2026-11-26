import type { KeyboardEvent } from 'react';
import type { Size } from '../../../../types';
import type {
  MultiSelectFieldOption,
  MultiSelectFieldVariant,
  TagKeyAction,
} from '../../MultiSelectField.types';

/**
 * Selected value rendered as a tag.
 */
export type MultiSelectFieldTagItem = {
  label: string;
  value: MultiSelectFieldOption['value'];
};

/**
 * Props of the `MultiSelectFieldTags` component.
 */
export type MultiSelectFieldTagsProps = {
  descriptionId: string;
  disabled: boolean;
  labelId: string;
  /** Called when a tag receives focus. */
  onFocusTag: () => void;
  /** Called with the action mapped from the pressed key and the index of the tag. */
  onKeyAction: (action: TagKeyAction | null, event: KeyboardEvent<HTMLDivElement>, index: number) => void;
  /** Called with the index of the tag whose remove button was clicked. */
  onRemoveTag: (index: number) => void;
  priority: MultiSelectFieldVariant;
  /** Stores the element of the tag at the given index. */
  registerTag: (index: number, element: HTMLDivElement | null) => void;
  size: Size;
  tags: MultiSelectFieldTagItem[];
};
