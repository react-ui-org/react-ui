import type { ReactNode } from 'react';
import type { CleanedComponentPropsWithChildren } from '../../types';

export type ModalContentProps = CleanedComponentPropsWithChildren<'div'> & {
  /**
   * Content of the modal.
   */
  children?: ReactNode;
};
