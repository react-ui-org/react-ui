export const getJustifyClassName = (value, styles) => {
  if (value === 'start') {
    return styles.isJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isJustifiedToEnd;
  }

  if (value === 'space-between') {
    return styles.isJustifiedToSpaceBetween;
  }

  return styles.isJustifiedToStretch;
};
