import { Scrolling } from '../../../types';

export const getScrollingClassName = (type: Scrolling, styles: Record<string, string>) => {
  if (type === 'auto') {
    return styles.isRootScrollingAuto;
  }

  if (type === 'custom') {
    return styles.isRootScrollingCustom;
  }

  return null;
};
