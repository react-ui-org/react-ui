import type {
  Align,
  CleanedComponentPropsWithChildren,
  Justify,
} from '../../types';
import type { ToolbarItemProps } from './ToolbarItem.types';
import type { ToolbarGroupProps } from './ToolbarGroup.types';

export type ToolbarProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Vertical alignment of toolbar items and groups.
   */
  align?: Align;
  /**
   * Nested elements. Supported types are:
   * * `ToolbarItems`
   * * `ToolbarGroups`
   *
   * If none are provided nothing is rendered.
   */
  children?: React.JSXElementConstructor<
  ToolbarItemProps
  | ToolbarGroupProps
  >[];
  /**
   * If `true`, spacing of all toolbar items in the toolbar will be reduced.
   */
  dense?: boolean;
  /**
   * Horizontal alignment (distribution) of toolbar items and groups.
   */
  justify?: Exclude<Justify, 'stretch'>;
  /**
   * If set, the toolbar will not wrap.
   */
  nowrap?: boolean;
};
