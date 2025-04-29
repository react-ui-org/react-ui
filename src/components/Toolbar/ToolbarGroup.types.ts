import type { ReactNode } from 'react';
import type {
  Align,
  CleanedComponentPropsWithChildren,
} from '../../types';

export type ToolbarGroupProps = CleanedComponentPropsWithChildren<'div'> & {
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
