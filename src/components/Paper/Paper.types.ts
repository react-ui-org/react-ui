import { ReactNode } from 'react';

export type PaperProps = React.ComponentProps<'div'> & {
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
