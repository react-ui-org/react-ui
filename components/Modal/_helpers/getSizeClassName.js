export const getSizeClassName = (modalSize, styles) => {
  if (modalSize === 'small') {
    return styles.isRootSizeSmall;
  }

  if (modalSize === 'medium') {
    return styles.isRootSizeMedium;
  }

  if (modalSize === 'large') {
    return styles.isRootSizeLarge;
  }

  if (modalSize === 'fullscreen') {
    return styles.isRootSizeFullscreen;
  }

  return styles.isRootSizeAuto;
};
