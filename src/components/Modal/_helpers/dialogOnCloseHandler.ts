// Disable coverage for the following function
/* istanbul ignore next */

import { ModalProps } from '../Modal.types';

/**
 * Handles the close event of the dialog which is fired when the user presses the Escape key or triggers close event
 * by native dialog mechanism.
 *
 * It prevents the default behaviour of the native dialog and closes the dialog manually by clicking the close button,
 * if the close button is not disabled.
 *
 * @param e
 * @param closeButtonRef
 * @param onCloseHandler
 */
export const dialogOnCloseHandler = (
  e: React.MouseEvent<HTMLDialogElement>,
  closeButtonRef: ModalProps['closeButtonRef'],
  onCloseHandler: ModalProps['onClose'] = undefined,
) => {
  // Prevent the default behaviour of the event as we want to close dialog manually.
  e.preventDefault();

  // If the close button is not disabled, close the modal.
  if (closeButtonRef?.current != null && closeButtonRef?.current?.disabled === false) {
    closeButtonRef.current.click();
  }

  // This is a custom handler that is passed as a prop to the Modal component
  if (onCloseHandler) {
    onCloseHandler(e);
  }
};
