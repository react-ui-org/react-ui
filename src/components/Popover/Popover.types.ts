import { ReactNode } from 'react';
import { Placement } from '../../types';

export type PlacementStyle = {
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
};

export type PopoverProps = React.ComponentProps<'div'> & {
  /**
   * Popover content.
   */
  children: ReactNode;
  /**
   * Popover placement affects position of the arrow.
   * Compatible with [Floating UI API](https://floating-ui.com/docs/computePosition#placement).
   */
  placement?: Placement;
  /**
   * Used for positioning the popover with a library like Floating UI. It is filtered,
   * then passed to the popover as the `style` prop.
   */
  placementStyle?: PlacementStyle;
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
