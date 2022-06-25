import PropTypes from 'prop-types';
import React from 'react';
import {
  RUIContext,
  withGlobalProps,
} from '../../provider';
import styles from './ModalHead.scss';

export const ModalHead = ({
  closeButtonDisabled,
  closeButtonRef,
  id,
  onClose,
  title,
}) => (
  <div
    className={styles.root}
    id={id}
  >
    <h3
      className={styles.title}
      {...(id && { id: `${id}__title` })}
    >
      {title}
    </h3>
    {onClose && (
      <RUIContext.Consumer>
        {({ translations }) => (
          <button
            type="button"
            className={styles.close}
            disabled={closeButtonDisabled}
            onClick={onClose}
            ref={closeButtonRef}
            title={translations.ModalHead.close}
            {...(id && { id: `${id}__closeButton` })}
          >
            ×
          </button>
        )}
      </RUIContext.Consumer>
    )}
  </div>
);

ModalHead.defaultProps = {
  closeButtonDisabled: false,
  closeButtonRef: null,
  id: undefined,
  onClose: undefined,
};

ModalHead.propTypes = {
  /**
   * If `true`, close button will be disabled.
   */
  closeButtonDisabled: PropTypes.bool,
  /**
   * Reference to close button element.
   */
  closeButtonRef: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    current: PropTypes.any,
  }),
  /**
   * ID of the root HTML element. It also serves as a base for nested elements:
   * * `<ID>__title`
   * * `<ID>__closeButton`
   */
  id: PropTypes.string,
  /**
   * Close handler of the modal. If not provided, close button will be hidden.
   */
  onClose: PropTypes.func,
  /**
   * Title of the modal.
   */
  title: PropTypes.string.isRequired,
};

export const ModalHeadWithGlobalProps = withGlobalProps(ModalHead, 'ModalHead');

export default ModalHeadWithGlobalProps;
