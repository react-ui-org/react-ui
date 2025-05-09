import type { ReactNode } from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';

export type PaperProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Content to be placed onto Paper.
   */
  children: ReactNode;
  /**
   * Visually suppress Paper.
   */
  muted?: boolean;
  /**
   * Add shadow to pull the Paper above surface.
   */
  raised?: boolean;
};
