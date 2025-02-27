import { ReactNode } from 'react';

export type CardBodyProps = React.ComponentProps<'div'> & {
  /**
   * Content of the card.
   */
  children: ReactNode;
};
