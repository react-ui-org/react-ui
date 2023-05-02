export interface ToolbarProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
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
  children?: React.ReactNode;
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
}

export interface ToolbarGroupProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Vertical alignment of toolbar items in the group.
   */
  align?: Align;
  /**
   * Grouped ToolbarItems. If none are provided nothing is rendered.
   */
  children?: React.ReactNode;
  /**
   * If `true`, spacing of toolbar items in the group will be reduced.
   */
  dense?: boolean;
  /**
   * If set, the toolbar group will not wrap.
   */
  nowrap?: boolean;
}

export interface ToolbarItemProps {
  /**
   * Rest of the props.
   */
  [key: string]: unknown;
  /**
   * Content of the toolbar item. If none are provided nothing is rendered.
   */
  children?: React.ReactNode;
  /**
   * Allow item to grow and shrink if needed.
   */
  flexible?: boolean;
}
