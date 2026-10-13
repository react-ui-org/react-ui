import type { CssModuleClasses } from '../../../types';
import type { ModalSize } from '../Modal.types';

export const getSizeClassName = (styles: CssModuleClasses, modalSize?: ModalSize) => {
  if (modalSize === 'small') {
    return styles.isRootSizeSmall;
  }

  if (modalSize === 'medium') {
    return styles.isRootSizeMedium;
  }

  if (modalSize === 'large') {
    return styles.isRootSizeLarge;
  }

  if (modalSize === 'fullscreen') {
    return styles.isRootSizeFullscreen;
  }

  return styles.isRootSizeAuto;
};
