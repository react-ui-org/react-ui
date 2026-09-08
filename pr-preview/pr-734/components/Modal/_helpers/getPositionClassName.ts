import type { CssModuleClasses } from '../../../types';
import type { ModalPosition } from '../Modal.types';

export const getPositionClassName = (styles: CssModuleClasses, modalPosition?: ModalPosition) => {
  if (modalPosition === 'top') {
    return styles.isRootPositionTop;
  }

  return null;
};
