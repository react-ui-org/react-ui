export const getRootClampClassName = (styles: Record<string, string>, lines?: number) => {
  if (lines === 1) {
    return styles.isRootClampSingleLine;
  }

  if (lines !== undefined && lines > 1) {
    return styles.isRootClampMultiLine;
  }

  return null;
};
