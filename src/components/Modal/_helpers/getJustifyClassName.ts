import type { CssModuleClasses } from '../../../types';
import type { ModalJustify } from '../Modal.types';

export const getJustifyClassName = (value: ModalJustify | undefined, styles: CssModuleClasses) => {
  if (value === 'start') {
    return styles.isRootJustifiedToStart;
  }

  if (value === 'center') {
    return styles.isRootJustifiedToCenter;
  }

  if (value === 'end') {
    return styles.isRootJustifiedToEnd;
  }

  if (value === 'space-between') {
    return styles.isRootJustifiedToSpaceBetween;
  }

  return styles.isRootJustifiedToStretch;
};
