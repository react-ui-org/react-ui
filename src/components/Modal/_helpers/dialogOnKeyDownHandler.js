export const dialogOnKeyDownHandler = (
  e,
  closeButtonRef,
  allowCloseOnEscapeKey,
) => {
  // When `allowCloseOnEscapeKey` is set to `false`, prevent closing the modal using the Escape key.
  if (
    e.key === 'Escape'
    && !allowCloseOnEscapeKey
  ) {
    e.preventDefault();
  }

  // When the close button is disabled, prevent closing the modal using the Escape key.
  if (
    e.key === 'Escape'
    && closeButtonRef?.current != null
    && closeButtonRef?.current?.disabled === true
  ) {
    e.preventDefault();
  }
};
