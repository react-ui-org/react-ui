export default (labelVisibility, styles) => {
  if (labelVisibility === 'desktop') {
    return styles.withLabelHiddenMobile;
  }

  if (labelVisibility === 'none') {
    return styles.withLabelHidden;
  }

  return null;
};
