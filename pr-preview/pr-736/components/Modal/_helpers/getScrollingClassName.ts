import type { CssModuleClasses } from '../../../types';
import type { ModalScrolling } from '../Modal.types';

export const getScrollingClassName = (styles: CssModuleClasses, type?: ModalScrolling) => {
  if (type === 'auto') {
    return styles.isRootScrollingAuto;
  }

  if (type === 'custom') {
    return styles.isRootScrollingCustom;
  }

  return null;
};
