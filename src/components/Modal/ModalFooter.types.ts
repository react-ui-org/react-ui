import { ReactNode } from 'react';
import { Justify } from '../../types';

export type ModalFooterProps = React.ComponentProps<'div'> & {
  /**
   * Content of the footer (preferably nested `Button` elements).
   */
  children: ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: Justify;
};
