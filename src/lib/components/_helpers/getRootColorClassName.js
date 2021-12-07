export const getRootColorClassName = (variant, styles) => {
  if (variant === 'primary') {
    return styles.rootColorPrimary;
  }

  if (variant === 'secondary') {
    return styles.rootColorSecondary;
  }

  if (variant === 'success') {
    return styles.rootColorSuccess;
  }

  if (variant === 'warning') {
    return styles.rootColorWarning;
  }

  if (variant === 'danger') {
    return styles.rootColorDanger;
  }

  if (variant === 'help') {
    return styles.rootColorHelp;
  }

  if (variant === 'info') {
    return styles.rootColorInfo;
  }

  if (variant === 'note') {
    return styles.rootColorNote;
  }

  if (variant === 'light') {
    return styles.rootColorLight;
  }

  if (variant === 'dark') {
    return styles.rootColorDark;
  }

  return null;
};
