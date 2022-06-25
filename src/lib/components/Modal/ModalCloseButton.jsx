import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import {
  RUIContext,
  withGlobalProps,
} from '../../provider';
import withForwardedRef from '../withForwardedRef';
import { transferProps } from '../_helpers/transferProps';
import styles from './ModalCloseButton.scss';

export const ModalCloseButton = ({
  disabled,
  forwardedRef,
  id,
  ...restProps
}) => {
  const { translations } = useContext(RUIContext);

  return (
    <button
      {...transferProps(restProps)}
      type="button"
      className={styles.root}
      disabled={disabled}
      id={id}
      ref={forwardedRef}
      title={translations.ModalCloseButton.close}
    >
      ×
    </button>
  );
};

ModalCloseButton.defaultProps = {
  disabled: false,
  forwardedRef: undefined,
  id: undefined,
};

ModalCloseButton.propTypes = {
  /**
   * If `true`, close button will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * Reference forwarded to the `button` element.
   */
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const ModalCloseButtonWithGlobalProps = withForwardedRef(withGlobalProps(ModalCloseButton, 'ModalCloseButton'));

export default ModalCloseButtonWithGlobalProps;
