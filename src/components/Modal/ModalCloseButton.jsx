import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  RUIContext,
  withGlobalProps,
} from '../../provider';
import { transferProps } from '../../utils/transferProps';
import styles from './ModalCloseButton.module.scss';

export const ModalCloseButton = React.forwardRef((props, ref) => {
  const {
    disabled,
    ...restProps
  } = props;

  const { translations } = useContext(RUIContext);

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
