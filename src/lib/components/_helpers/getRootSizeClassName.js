export const getRootSizeClassName = (size, styles) => {
  if (size === 'small') {
    return styles.rootSizeSmall;
  }

  if (size === 'medium') {
    return styles.rootSizeMedium;
  }

  if (size === 'large') {
    return styles.rootSizeLarge;
  }

  return null;
};
