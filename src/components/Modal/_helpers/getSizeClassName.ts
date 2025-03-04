import { ModalSize } from '../Modal.types';

export const getSizeClassName = (modalSize: ModalSize, styles: Record<string, string>) => {
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
