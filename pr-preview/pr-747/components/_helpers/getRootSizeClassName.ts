import type {
  CssModuleClasses,
  Size,
} from '../../types';

export const getRootSizeClassName = (styles: CssModuleClasses, size?: Size) => {
  if (size === 'small') {
    return styles.isRootSizeSmall;
  }

  if (size === 'medium') {
    return styles.isRootSizeMedium;
  }

  if (size === 'large') {
    return styles.isRootSizeLarge;
  }

  return null;
};
