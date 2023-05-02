interface ExtendedStyles extends React.CSSProperties {
  isRootWordWrappingAnywhere: string;
  isRootWordWrappingLongWords: string;
}

export const getRootWordWrappingClassName = (wordWrapping: WordWrapping, styles: ExtendedStyles) => {
  if (wordWrapping === 'anywhere') {
    return styles.isRootWordWrappingAnywhere;
  }

  if (wordWrapping === 'long-words') {
    return styles.isRootWordWrappingLongWords;
  }

  return null;
};
