
interface ExtendedStyles extends React.CSSProperties {
  hasLabelHidden: string;
  hasLabelVisibleLg: string;
  hasLabelVisibleMd: string;
  hasLabelVisibleSm: string;
  hasLabelVisibleX2l: string;
  hasLabelVisibleX3l: string;
  hasLabelVisibleXl: string;
}

const getLabelVisibilityClass = (labelVisibility: Breakpoint, styles: ExtendedStyles): string | null => {
  // Intentionally omitting `xs` which means label is visible on all screen sizes.

  if (labelVisibility === 'sm') {
    return styles.hasLabelVisibleSm;
  }

  if (labelVisibility === 'md') {
    return styles.hasLabelVisibleMd;
  }

  if (labelVisibility === 'lg') {
    return styles.hasLabelVisibleLg;
  }

  if (labelVisibility === 'xl') {
    return styles.hasLabelVisibleXl;
  }

  if (labelVisibility === 'x2l') {
    return styles.hasLabelVisibleX2l;
  }

  if (labelVisibility === 'x3l') {
    return styles.hasLabelVisibleX3l;
  }

  if (labelVisibility === 'none') {
    return styles.hasLabelHidden;
  }

  return null;
};

export default getLabelVisibilityClass;
