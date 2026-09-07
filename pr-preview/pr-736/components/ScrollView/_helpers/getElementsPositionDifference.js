export const getElementsPositionDifference = (contentEl, viewportEl) => {
  const contentPosition = contentEl.current.getBoundingClientRect();
  const viewportPosition = viewportEl.current.getBoundingClientRect();

  return {
    bottom: contentPosition.bottom - viewportPosition.bottom,
    left: contentPosition.left - viewportPosition.left,
    right: contentPosition.right - viewportPosition.right,
    top: contentPosition.top - viewportPosition.top,
  };
};
