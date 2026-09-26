import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { TranslationsContext } from '../../providers/translations';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../helpers/transferProps';
import styles from './ModalCloseButton.module.scss';
import type { ModalCloseButtonProps } from './Modal.types';

export const ModalCloseButton = React.forwardRef<HTMLButtonElement, ModalCloseButtonProps>(({
  disabled = false,
  ...restProps
}, ref) => {
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
ModalCloseButton.propTypes = {
  /**
   * If `true`, close button will be disabled.
   */
  disabled: PropTypes.bool,
};

export const ModalCloseButtonWithGlobalProps = withGlobalProps<ModalCloseButtonProps, HTMLButtonElement>(ModalCloseButton, 'ModalCloseButton');

export default ModalCloseButtonWithGlobalProps;
