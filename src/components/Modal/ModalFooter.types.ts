import type { ReactNode } from 'react';
import type {
  CleanedComponentPropsWithChildren,
  Justify,
} from '../../types';

export type ModalFooterProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Content of the footer (preferably nested `Button` elements).
   */
  children: ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: Justify;
};
