export const getRootColorClassName = (variant, styles) => {
  if (variant === 'primary') {
    return styles.isRootColorPrimary;
  }

  if (variant === 'secondary') {
    return styles.isRootColorSecondary;
  }

  if (variant === 'success') {
    return styles.isRootColorSuccess;
  }

  if (variant === 'warning') {
    return styles.isRootColorWarning;
  }

  if (variant === 'danger') {
    return styles.isRootColorDanger;
  }

  if (variant === 'help') {
    return styles.isRootColorHelp;
  }

  if (variant === 'info') {
    return styles.isRootColorInfo;
  }

  if (variant === 'note') {
    return styles.isRootColorNote;
  }

  if (variant === 'light') {
    return styles.isRootColorLight;
  }

  if (variant === 'dark') {
    return styles.isRootColorDark;
  }

  return null;
};
