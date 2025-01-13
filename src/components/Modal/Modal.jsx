import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { dialogOnCancelHandler } from './_helpers/dialogOnCancelHandler';
import { dialogOnClickHandler } from './_helpers/dialogOnClickHandler';
import { dialogOnCloseHandler } from './_helpers/dialogOnCloseHandler';
import { dialogOnKeyDownHandler } from './_helpers/dialogOnKeyDownHandler';
import { getPositionClassName } from './_helpers/getPositionClassName';
import { getSizeClassName } from './_helpers/getSizeClassName';
import { useModalFocus } from './_hooks/useModalFocus';
import { useModalScrollPrevention } from './_hooks/useModalScrollPrevention';
import styles from './Modal.module.scss';

const preRender = (
  children,
  dialogRef,
  position,
  size,
  events,
  restProps,
) => (
  <dialog
    {...transferProps(restProps)}
    {...transferProps(events)}
    className={classNames(
      styles.root,
      getSizeClassName(size, styles),
      getPositionClassName(position, styles),
    )}
    ref={dialogRef}
  >
    {children}
  </dialog>
);

export const Modal = ({
  allowCloseOnBackdropClick,
  allowCloseOnEscapeKey,
  allowPrimaryActionOnEnterKey,
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
  const dialogRef = useRef();

  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  useModalFocus(allowPrimaryActionOnEnterKey, autoFocus, dialogRef, primaryButtonRef);
  useModalScrollPrevention(preventScrollUnderneath);

  const onCancel = useCallback(
    (e) => dialogOnCancelHandler(e, closeButtonRef),
    [closeButtonRef],
  );
  const onClick = useCallback(
    (e) => dialogOnClickHandler(e, closeButtonRef, dialogRef, allowCloseOnBackdropClick),
    [allowCloseOnBackdropClick, closeButtonRef, dialogRef],
  );
  const onClose = useCallback(
    (e) => dialogOnCloseHandler(e, closeButtonRef),
    [closeButtonRef],
  );
  const onKeyDown = useCallback(
    (e) => dialogOnKeyDownHandler(e, closeButtonRef, allowCloseOnEscapeKey),
    [allowCloseOnEscapeKey, closeButtonRef],
  );
  const events = {
    onCancel,
    onClick,
    onClose,
    onKeyDown,
  };

  if (portalId === null) {
    return preRender(
      children,
      dialogRef,
      position,
      size,
      events,
      restProps,
    );
  }

  return createPortal(
    preRender(
      children,
      dialogRef,
      position,
      size,
      events,
      restProps,
    ),
    document.getElementById(portalId),
  );
};

Modal.defaultProps = {
  allowCloseOnBackdropClick: true,
  allowCloseOnEscapeKey: true,
  allowPrimaryActionOnEnterKey: true,
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
   * If `true`, the `Modal` can be closed by clicking on the backdrop.
   */
  allowCloseOnBackdropClick: PropTypes.bool,
  /**
   * If `true`, the `Modal` can be closed by pressing the Escape key.
   */
  allowCloseOnEscapeKey: PropTypes.bool,
  /**
   * If `true`, the `Modal` can be submitted by pressing the Enter key.
   */
  allowPrimaryActionOnEnterKey: PropTypes.bool,
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
   * Reference to close button element. It is used to close modal when Escape key is pressed
   * or the backdrop is clicked.
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
