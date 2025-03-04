import { ModalVerticalPosition } from '../Modal.types';

export const getPositionClassName = (modalPosition: ModalVerticalPosition, styles: Record<string, string>) => {
  if (modalPosition === 'top') {
    return styles.isRootPositionTop;
  }

  return null;
};
