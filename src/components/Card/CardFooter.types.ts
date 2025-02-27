import { ReactNode } from 'react';

export type CardFooterProps = React.ComponentProps<'div'> & {
  /**
   * Card actions, usually buttons.
   */
  children?: ReactNode;
};
