import type { CleanedComponentPropsWithChildren } from '../../types';

export type ModalCloseButtonProps = CleanedComponentPropsWithChildren<'button'> & {
  /**
   * If `true`, close button will be disabled.
   */
  disabled?: boolean;
};
