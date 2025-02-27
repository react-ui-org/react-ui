import { ReactNode } from 'react';
import { Align } from '../../types';

export type ToolbarGroupProps = React.ComponentProps<'div'> & {
  /**
   * Vertical alignment of toolbar items in the group.
   */
  align?: Align;
  /**
   * Grouped ToolbarItems. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * If `true`, spacing of toolbar items in the group will be reduced.
   */
  dense?: boolean;
  /**
   * If set, the toolbar group will not wrap.
   */
  nowrap?: boolean;
};
