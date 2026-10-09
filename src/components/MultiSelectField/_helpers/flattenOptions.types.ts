import type { MultiSelectFieldOption } from '../MultiSelectField.types';

export type FlatOption = {
  disabled: boolean;
  key: NonNullable<MultiSelectFieldOption['key']> | MultiSelectFieldOption['value'];
  label: MultiSelectFieldOption['label'];
  value: MultiSelectFieldOption['value'];
};
