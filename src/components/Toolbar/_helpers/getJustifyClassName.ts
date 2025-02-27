export const getJustifyClassName = (value, styles) => {
  if (value === 'start') {
    return styles.isToolbarJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isToolbarJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isToolbarJustifiedToEnd;
  }

  return styles.isToolbarJustifiedToSpaceBetween;
};

