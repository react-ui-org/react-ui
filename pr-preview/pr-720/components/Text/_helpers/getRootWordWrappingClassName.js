export const getRootWordWrappingClassName = (wordWrapping, styles) => {
  if (wordWrapping === 'anywhere') {
    return styles.isRootWordWrappingAnywhere;
  }

  if (wordWrapping === 'long-words') {
    return styles.isRootWordWrappingLongWords;
  }

  return null;
};
