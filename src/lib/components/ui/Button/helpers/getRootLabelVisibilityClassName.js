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

  if (labelVisibility === 'xxl') {
    return styles.withLabelVisibleXxl;
  }

  if (labelVisibility === 'xxxl') {
    return styles.withLabelVisibleXxxl;
  }

  if (labelVisibility === 'none') {
    return styles.withLabelHidden;
  }

  return null;
};
