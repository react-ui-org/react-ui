import { ReactNode } from 'react';

export type ToolbarItemProps = React.ComponentProps<'div'> & {
  /**
   * Content of the toolbar item. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * Allow item to grow and shrink if needed.
   */
  flexible?: boolean;
};
