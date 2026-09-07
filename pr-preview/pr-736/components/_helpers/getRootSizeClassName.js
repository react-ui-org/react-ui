export const getRootSizeClassName = (size, styles) => {
  if (size === 'small') {
    return styles.isRootSizeSmall;
  }

  if (size === 'medium') {
    return styles.isRootSizeMedium;
  }

  if (size === 'large') {
    return styles.isRootSizeLarge;
  }

  return null;
};
