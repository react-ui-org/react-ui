import type { ReactNode } from 'react';
import type {
  CleanedComponentPropsWithChildren,
  Justify,
} from '../../types';

export type ModalHeaderProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: Justify;
};
