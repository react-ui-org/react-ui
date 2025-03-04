import {
  JSX,
  ReactNode,
} from 'react';

export type PopoverWrapperProps = {
  /**
   * Other component
   */
  [key: string]: unknown
  /**
   * Popover reference and the Popover itself.
   */
  children: ReactNode;
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: keyof JSX.IntrinsicElements;
};
