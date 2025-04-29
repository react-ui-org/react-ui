import type { ReactNode } from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';

export type CardBodyProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Content of the card.
   */
  children: ReactNode;
};
