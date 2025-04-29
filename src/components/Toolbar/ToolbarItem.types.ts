import type { ReactNode } from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';

export type ToolbarItemProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Content of the toolbar item. If none are provided nothing is rendered.
   */
  children?: ReactNode;
  /**
   * Allow item to grow and shrink if needed.
   */
  flexible?: boolean;
};
