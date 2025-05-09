import type { ReactNode } from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';

export type CardFooterProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Card actions, usually buttons.
   */
  children?: ReactNode;
};
