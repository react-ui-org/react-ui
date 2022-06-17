export default (labelVisibility, styles) => {
  // Intentionally omitting `xs` which means label is visible on all screen sizes.

  if (labelVisibility === 'sm') {
    return styles.withLabelVisibleSm;
  }

  if (labelVisibility === 'md') {
    return styles.withLabelVisibleMd;
  }

  if (labelVisibility === 'lg') {
    return styles.withLabelVisibleLg;
  }

  if (labelVisibility === 'xl') {
    return styles.withLabelVisibleXl;
  }

  if (labelVisibility === 'x2l') {
    return styles.withLabelVisibleX2l;
  }

  if (labelVisibility === 'x3l') {
    return styles.withLabelVisibleX3l;
  }

  if (labelVisibility === 'none') {
    return styles.withLabelHidden;
  }

  return null;
};
