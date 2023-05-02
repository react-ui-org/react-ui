export interface PopoverProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Popover content.
   */
  children: React.ReactNode;
  /**
   * Popover placement affects position of the arrow.
   * Compatible with [Floating UI API](https://floating-ui.com/docs/computePosition#placement).
   */
  placement?: Placement;
  /**
   * If set, popover is rendered in the React Portal with that ID.
   */
  portalId?: string;
}

export interface PopoverWrapperProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Popover reference and the Popover itself.
   */
  children: React.ReactNode;
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: keyof JSX.IntrinsicElements;
}
