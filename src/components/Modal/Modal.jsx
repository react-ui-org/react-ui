import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { getPositionClassName } from './_helpers/getPositionClassName';
import { getSizeClassName } from './_helpers/getSizeClassName';
import { useModalFocus } from './_hooks/useModalFocus';
import { useModalScrollPrevention } from './_hooks/useModalScrollPrevention';
import styles from './Modal.module.scss';

const preRender = (
  children,
  childrenWrapperRef,
  closeButtonRef,
  position,
  restProps,
  size,
) => (
  <div
    className={styles.backdrop}
    onClick={(e) => {
      e.preventDefault();
      if (closeButtonRef?.current != null) {
        closeButtonRef.current.click();
      }
    }}
    role="presentation"
  >
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.root,
        getSizeClassName(size, styles),
        getPositionClassName(position, styles),
      )}
      onClick={(e) => {
        e.stopPropagation();
      }}
      ref={childrenWrapperRef}
      role="presentation"
    >
      {children}
    </div>
  </div>
);

export const Modal = ({
  autoFocus,
  children,
  closeButtonRef,
  portalId,
  position,
  preventScrollUnderneath,
  primaryButtonRef,
  size,
  ...restProps
}) => {
  const childrenWrapperRef = useRef();

  useModalFocus(
    autoFocus,
    childrenWrapperRef,
    primaryButtonRef,
    closeButtonRef,
  );

  useModalScrollPrevention(preventScrollUnderneath);

  if (portalId === null) {
    return preRender(
      children,
      childrenWrapperRef,
      closeButtonRef,
      position,
      restProps,
      size,
    );
  }

  return createPortal(
    preRender(
      children,
      childrenWrapperRef,
      closeButtonRef,
      position,
      restProps,
      size,
    ),
    document.getElementById(portalId),
  );
};

Modal.defaultProps = {
  autoFocus: true,
  children: null,
  closeButtonRef: null,
  portalId: null,
  position: 'center',
  preventScrollUnderneath: window.document.body,
  primaryButtonRef: null,
  size: 'medium',
};

Modal.propTypes = {
  /**
   * If `true`, focus the first input element in the `Modal`, or primary button (referenced by the `primaryButtonRef`
   * prop), or other focusable element when the `Modal` is opened. If there are none or `autoFocus` is set to `false`,
   * focus the Modal itself.
   */
  autoFocus: PropTypes.bool,
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalHeader`
   * * `ModalBody`
   * * `ModalFooter`
   *
   * At least `ModalBody` is required.
   */
  children: PropTypes.node,
  /**
   * Reference to close button element. It is used to close modal when Escape key is pressed or the backdrop is clicked.
   */
  closeButtonRef: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    current: PropTypes.any,
  }),
  /**
   * If set, modal is rendered in the React Portal with that ID.
   */
  portalId: PropTypes.string,
  /**
   * Vertical position of the modal inside browser window.
   */
  position: PropTypes.oneOf(['top', 'center']),
  /**
   * Mode in which Modal prevents scroll of elements bellow:
   * * `off` - Modal does not prevent any scroll
   * * [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) - Modal prevents scroll on this HTML element
   * * object
   *   * `reset` - method called on Modal's unmount to reset scroll prevention
   *   * `start` - method called on Modal's mount to custom scroll prevention
   */
  preventScrollUnderneath: PropTypes.oneOfType([
    PropTypes.oneOf([
      HTMLElement,
      'off',
    ]),
    PropTypes.shape({
      reset: PropTypes.func,
      start: PropTypes.func,
    }),
  ]),
  /**
   * Reference to primary button element. It is used to submit modal when Enter key is pressed and as fallback
   * when `autoFocus` functionality does not find any input element to be focused.
   */
  primaryButtonRef: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    current: PropTypes.any,
  }),
  /**
   * Size of the modal.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fullscreen', 'auto']),
};

export const ModalWithGlobalProps = withGlobalProps(Modal, 'Modal');

export default ModalWithGlobalProps;
