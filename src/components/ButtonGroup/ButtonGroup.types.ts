import type { ReactNode } from 'react';
import type {
  CleanedComponentPropsWithChildren,
  Priority,
  Size,
} from '../../types';

export type ButtonGroupProps = CleanedComponentPropsWithChildren<'fieldset'> & {
  /**
   * If `true`, the button group will span the full width of its parent.
   */
  block?: boolean;
  /**
   * Buttons to be grouped. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * If `true`, all buttons inside the group will be disabled.
   */
  disabled?: boolean;
  /**
   * Visual priority to highlight or suppress the buttons.
   */
  priority?: Priority;
  /**
   * Size of the buttons.
   */
  size?: Size;
};
