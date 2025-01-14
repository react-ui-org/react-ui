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
