export const getRootClampClassName = (lines, styles) => {
  if (lines === 1) {
    return styles.isRootClampSingleLine;
  }

  if (lines > 1) {
    return styles.isRootClampMultiLine;
  }

  return null;
};
