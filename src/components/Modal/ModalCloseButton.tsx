import React, { useContext } from 'react';
import { TranslationsContext } from '../../providers/translations';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import { ModalCloseButtonProps } from './ModalCloseButton.types';
import styles from './ModalCloseButton.module.scss';

export const ModalCloseButton = React.forwardRef<HTMLButtonElement, ModalCloseButtonProps>((props, ref) => {
  const {
    disabled = false,
    ...restProps
  } = props;

  const translations = useContext(TranslationsContext);

  return (
    <button
      {...transferProps(restProps)}
      className={styles.root}
      disabled={disabled}
      ref={ref}
      title={translations.ModalCloseButton.close}
      type="button"
    >
      ×
    </button>
  );
});

export const ModalCloseButtonWithGlobalProps = withGlobalProps(ModalCloseButton, 'ModalCloseButton');

export default ModalCloseButtonWithGlobalProps;
