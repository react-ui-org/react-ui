import type { ReactNode } from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';

export type ModalTitleProps = CleanedComponentPropsWithChildren<
| 'h1'
| 'h2'
| 'h3'
| 'h4'
| 'h5'
| 'h6'
> & {
  /**
   * Content of the header (preferably ModalTitle and ModalCloseButton).
   */
  children: ReactNode;
  /**
   * Optional heading level. Preferably `1` or `2` should be used, see
   * [W3C recommendation](https://github.com/w3c/aria-practices/issues/551#issuecomment-365134527).
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};
