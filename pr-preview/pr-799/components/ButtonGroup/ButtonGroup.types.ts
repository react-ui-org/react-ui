import type {
  FieldsetHTMLAttributes,
  ReactNode,
} from 'react';
import type {
  Priority,
  Size,
} from '../../types';

/**
 * Props of the `ButtonGroup` component.
 */
export type ButtonGroupProps = Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'disabled'> & {
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

/**
 * Values `ButtonGroup` provides to the buttons rendered inside it.
 */
export type ButtonGroupContextValue = {
  block: boolean;
  disabled: boolean;
  priority: Priority;
  size: Size;
};

