// Disable coverage for the following function
/* istanbul ignore next */

/**
 * Handles the click event of the dialog which is fired when the user clicks on the dialog or on its descendants.
 *
 * This handler is used to close the dialog when the user clicks on the backdrop, if it is allowed to close
 * on backdrop click and the close button is not disabled.
 *
 * @param e
 * @param closeButtonRef
 * @param dialogRef
 * @param allowCloseOnBackdropClick
 */
export const dialogOnClickHandler = (
  e,
  closeButtonRef,
  dialogRef,
  allowCloseOnBackdropClick,
) => {
  // If it is not allowed to close modal on backdrop click, do nothing.
  if (!allowCloseOnBackdropClick) {
    return;
  }

  // Detection of the click on the backdrop is based on the following conditions:
  // 1. The click target is the dialog itself. This prevents detection of clicks on the dialog's children.
  // 2. The click is outside the dialog's boundaries.
  const dialogRect = dialogRef.current.getBoundingClientRect();
  const isClickedOnBackdrop = dialogRef.current === e.target && (
    e.clientX < dialogRect.left
    || e.clientX > dialogRect.right
    || e.clientY < dialogRect.top
    || e.clientY > dialogRect.bottom
  );

  // If user does not click on the backdrop, do nothing.
  if (!isClickedOnBackdrop) {
    return;
  }

  // If the close button is not disabled, close the modal.
  if (closeButtonRef?.current != null && closeButtonRef?.current?.disabled === false) {
    closeButtonRef.current.click();
  }
};
