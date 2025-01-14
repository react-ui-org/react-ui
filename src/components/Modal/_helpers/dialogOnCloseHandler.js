export const dialogOnCloseHandler = (e, closeButtonRef, onCloseHandler = undefined) => {
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
