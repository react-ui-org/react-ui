import React, {
  useContext,
} from 'react';
import {
  RUIContext,
  withGlobalProps,
} from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import styles from './ModalCloseButton.scss';
import { ModalCloseButtonProps } from './Modal.types';

export const ModalCloseButton:
React.FunctionComponent<ModalCloseButtonProps> = React.forwardRef<HTMLButtonElement, ModalCloseButtonProps>(({
  disabled = false,
  ...restProps
}, ref) => {
  const { translations } = useContext(RUIContext);

  return (
    <button
      {...transferProps(restProps)}
      className={styles.root}
      disabled={disabled}
      ref={ref}
      title={translations?.ModalCloseButton.close}
      type="button"
    >
      ×
    </button>
  );
});

export const ModalCloseButtonWithGlobalProps = withGlobalProps(ModalCloseButton, 'ModalCloseButton');

export default ModalCloseButtonWithGlobalProps;
