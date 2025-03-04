export const getElementsPositionDifference = (
  contentEl: React.RefObject<HTMLDivElement | null>,
  viewportEl: React.RefObject<HTMLDivElement>,
) => {
  if (!contentEl.current || !viewportEl.current) {
    return null;
  }

  const contentPosition = contentEl.current.getBoundingClientRect();
  const viewportPosition = viewportEl.current.getBoundingClientRect();

  return {
    bottom: contentPosition.bottom - viewportPosition.bottom,
    left: contentPosition.left - viewportPosition.left,
    right: contentPosition.right - viewportPosition.right,
    top: contentPosition.top - viewportPosition.top,
  };
};
