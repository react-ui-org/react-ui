import type {
  Priority,
  Size,
} from '../../types';

export type ButtonGroupContextType = {
  block: boolean;
  disabled: boolean;
  priority: Priority;
  size: Size;
};
