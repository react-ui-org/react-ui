// Disable coverage for the following function
/* istanbul ignore next */

/**
 * Handles the keydown event of the dialog which is fired when the user presses a key within the dialog.
 *
 * This handler is used to stop propagation of the Escape key press, if it is not allowed to close
 * on Escape key and the close button is disabled.
 *
 * It is also used to trigger the primary action when the user presses the Enter key, if it is allowed to trigger
 * the primary action on Enter key and the primary button is not disabled. This applies only when the focused
 * element is an input or select as other elements should not trigger the primary action. Textarea is omitted
 * as Enter key is used for new line.
 *
 * @param e
 * @param closeButtonRef
 * @param primaryButtonRef
 * @param allowCloseOnEscapeKey
 * @param allowPrimaryActionOnEnterKey
 */
export const dialogOnKeyDownHandler = (
  e,
  closeButtonRef,
  primaryButtonRef,
  allowCloseOnEscapeKey,
  allowPrimaryActionOnEnterKey,
) => {
  // Prevent closing the modal using the Escape key when one of the following conditions is met:
  // 1. The close button is not present
  // 2. The close button is disabled
  // 3. `allowCloseOnEscapeKey` is set to `false`
  if (
    e.key === 'Escape'
    && (
      closeButtonRef?.current == null
      || closeButtonRef?.current?.disabled === true
      || !allowCloseOnEscapeKey
    )
  ) {
    e.preventDefault();
  }

  // Trigger the primary action when the Enter key is pressed and the following conditions are met:
  // 1. The primary button is present
  // 2. The primary button is not disabled
  // 3. `allowPrimaryActionOnEnterKey` is set to `true`
  // 4. The focused element is an input or select (text area is omitted as Enter key is used for new line)
  if (
    e.key === 'Enter'
    && primaryButtonRef?.current != null
    && primaryButtonRef?.current?.disabled === false
    && allowPrimaryActionOnEnterKey
    && ['INPUT', 'SELECT'].includes(e.target.nodeName)
  ) {
    primaryButtonRef.current.click();
  }
};
