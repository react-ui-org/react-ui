export const getJustifyClassName = (value, styles) => {
  if (value === 'start') {
    return styles.isRootJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isRootJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isRootJustifiedToEnd;
  }

  if (value === 'space-between') {
    return styles.isRootJustifiedToSpaceBetween;
  }

  return styles.isRootJustifiedToStretch;
};
