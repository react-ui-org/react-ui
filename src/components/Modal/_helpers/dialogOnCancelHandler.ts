// Disable coverage for the following function
/* istanbul ignore next */

/**
 * Handles the cancel event of the dialog which is fired when the user presses the Escape key or triggers cancel event
 * by native dialog mechanism.
 *
 * It prevents the default behaviour of the native dialog and closes the dialog manually by clicking the close button,
 * if the close button is not disabled.
 *
 * @param e
 * @param closeButtonRef
 * @param onCancelHandler
 */
export const dialogOnCancelHandler = (
  e: React.MouseEvent<HTMLDialogElement>,
  closeButtonRef?: React.RefObject<HTMLButtonElement>,
  onCancelHandler?: (e: React.MouseEvent<HTMLDialogElement>) => void,
) => {
  // Prevent the default behaviour of the event as we want to close dialog manually.
  e.preventDefault();

  // If the close button is not disabled, close the modal.
  if (closeButtonRef?.current != null && closeButtonRef?.current?.disabled === false) {
    closeButtonRef.current.click();
  }

  // This is a custom handler that is passed as a prop to the Modal component
  if (onCancelHandler) {
    onCancelHandler(e);
  }
};
