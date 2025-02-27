import { ReactNode } from 'react';

export type ModalContentProps = React.ComponentProps<'div'> & {
  /**
   * Content of the modal.
   */
  children?: ReactNode;
};
