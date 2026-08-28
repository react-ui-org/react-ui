import type { CssModuleClasses } from '../../../types';
import type { ModalPosition } from '../Modal.types';

export const getPositionClassName = (modalPosition: ModalPosition | undefined, styles: CssModuleClasses) => {
  if (modalPosition === 'top') {
    return styles.isRootPositionTop;
  }

  return null;
};
