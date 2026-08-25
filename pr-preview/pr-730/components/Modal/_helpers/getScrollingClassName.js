export const getScrollingClassName = (type, styles) => {
  if (type === 'auto') {
    return styles.isRootScrollingAuto;
  }

  if (type === 'custom') {
    return styles.isRootScrollingCustom;
  }

  return null;
};
