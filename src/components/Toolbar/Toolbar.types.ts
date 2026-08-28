import type {
  HTMLAttributes,
  ReactNode,
} from 'react';

export type ToolbarAlign = 'top' | 'middle' | 'bottom' | 'baseline';

export type ToolbarJustify = 'start' | 'center' | 'end' | 'space-between';

/**
 * Props of the `Toolbar` component.
 */
export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Vertical alignment of toolbar items and groups.
   */
  align?: ToolbarAlign;
  /**
   * Nested elements. Supported types are:
   * * `ToolbarItems`
   * * `ToolbarGroups`
   *
   * If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * If `true`, spacing of all toolbar items in the toolbar will be reduced.
   */
  dense?: boolean;
  /**
   * Horizontal alignment (distribution) of toolbar items and groups.
   */
  justify?: ToolbarJustify;
  /**
   * If set, the toolbar will not wrap.
   */
  nowrap?: boolean;
};

/**
 * Props of the `ToolbarGroup` component.
 */
export type ToolbarGroupProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Vertical alignment of toolbar items in the group.
   */
  align?: ToolbarAlign;
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

/**
 * Props of the `ToolbarItem` component.
 */
export type ToolbarItemProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * Content of the toolbar item. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * Allow item to grow and shrink if needed.
   */
  flexible?: boolean;
};
