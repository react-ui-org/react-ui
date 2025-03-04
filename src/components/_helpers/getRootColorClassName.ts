import { Color } from '../../types';

export const getRootColorClassName = (variant: Color, styles: Record<string, string>) => {
  if (variant === 'primary') {
    return styles.isRootColorPrimary;
  }

  if (variant === 'secondary') {
    return styles.isRootColorSecondary;
  }

  if (variant === 'selected') {
    return styles.isRootColorSelected;
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
