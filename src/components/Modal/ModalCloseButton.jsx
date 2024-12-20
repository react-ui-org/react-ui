import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { TranslationsContext } from '../../providers/translations';
import { withGlobalProps } from '../../providers/globalProps';
import { transferProps } from '../../utils/transferProps';
import styles from './ModalCloseButton.module.scss';

export const ModalCloseButton = React.forwardRef((props, ref) => {
  const {
    disabled,
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

ModalCloseButton.defaultProps = {
  disabled: false,
};

ModalCloseButton.propTypes = {
  /**
   * If `true`, close button will be disabled.
   */
  disabled: PropTypes.bool,
};

export const ModalCloseButtonWithGlobalProps = withGlobalProps(ModalCloseButton, 'ModalCloseButton');

export default ModalCloseButtonWithGlobalProps;
