export const getRootWordWrappingClassName = (wordWrapping, styles) => {
  if (wordWrapping === 'anywhere') {
    return styles.rootWordWrappingAnywhere;
  }

  if (wordWrapping === 'long-words') {
    return styles.rootWordWrappingLongWords;
  }

  return null;
};
