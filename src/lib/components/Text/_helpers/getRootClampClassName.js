export const getRootClampClassName = (lines, styles) => {
  if (lines === 1) {
    return styles.rootClampSingleLine;
  }

  if (lines > 1) {
    return styles.rootClampMultiLine;
  }

  return null;
};
