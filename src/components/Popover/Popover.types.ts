import type {
  HTMLAttributes,
  ReactNode,
} from 'react';

export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end';

export type PopoverPlacementStyle = {
  bottom?: string;
  inset?: string;
  'inset-block-end'?: string;
  'inset-block-start'?: string;
  'inset-inline-end'?: string;
  'inset-inline-start'?: string;
  left?: string;
  position?: string;
  right?: string;
  top?: string;
  'transform-origin'?: string;
  translate?: string;
  visibility?: string;
};

/**
 * Props of the `Popover` component.
 */
export type PopoverProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  /**
   * Popover content.
   */
  children: ReactNode;
  /**
   * Popover placement affects position of the arrow.
   * Compatible with [Floating UI API](https://floating-ui.com/docs/computePosition#placement).
   */
  placement?: PopoverPlacement;
  /**
   * Used for positioning the popover with a library like Floating UI. It is filtered,
   * then passed to the popover as the `style` prop.
   */
  placementStyle?: PopoverPlacementStyle;
  /**
   * If set, the popover will become controlled, meaning it will be hidden by default and will need a trigger to open.
   * This sets the ID of the internal helper element for the popover.
   * Assign the same ID to `popovertarget` of a trigger to make it open and close.
   */
  popoverTargetId?: string;
  /**
   * If set, popover is rendered in the React Portal with that ID.
   */
  portalId?: string;
};

export type PopoverWrapperProps = HTMLAttributes<HTMLElement> & {
  /**
   * Popover reference and the Popover itself.
   */
  children: ReactNode;
  /**
   * HTML tag to render. Can be any valid HTML tag of your choice, usually a
   * [block-level element](https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements).
   */
  tag?: string;
};
