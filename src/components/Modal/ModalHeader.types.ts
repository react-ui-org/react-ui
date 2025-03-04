import { ReactNode } from 'react';
import { Justify } from '../../types';

export type ModalHeaderProps = React.ComponentProps<'div'> & {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: ReactNode;
  /**
   * Horizontal alignment (distribution) of individual buttons.
   */
  justify?: Justify;
};
