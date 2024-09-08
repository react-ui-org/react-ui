export const dialogOnCancelHandler = (e, closeButtonRef) => {
  // Prevent the default behaviour of the event as we want to close dialog manually.
  e.preventDefault();

  // If the close button is not disabled, close the modal.
  if (
    closeButtonRef?.current != null
    && closeButtonRef?.current?.disabled === false
  ) {
    closeButtonRef.current.click();
  }
};
