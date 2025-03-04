import { Size } from '../../types';

export const getRootSizeClassName = (size: Size | undefined, styles: Record<string, string>) => {
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
