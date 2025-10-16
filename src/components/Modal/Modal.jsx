import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { withGlobalProps } from '../../providers/globalProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
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
  color,
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
      color && getRootColorClassName(color, styles),
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
  color,
  dialogRef,
  portalId,
  position,
  preventScrollUnderneath,
  primaryButtonRef,
  size,
  ...restProps
}) => {
  const internalDialogRef = useRef();
  const mouseDownTarget = useRef(null);

  useEffect(() => {
    internalDialogRef.current.showModal();
  }, []);

  // We need to have a reference to the dialog element to be able to call its methods,
  // but at the same time we want to expose this reference to the parent component for
  // case someone wants to call dialog methods from outside the component.
  useImperativeHandle(dialogRef, () => internalDialogRef.current);

  useModalFocus(autoFocus, internalDialogRef, primaryButtonRef);
  useModalScrollPrevention(preventScrollUnderneath);

  const onCancel = useCallback(
    (e) => dialogOnCancelHandler(e, closeButtonRef, restProps.onCancel),
    [closeButtonRef, restProps.onCancel],
  );
  const onClick = useCallback(
    (e) => dialogOnClickHandler(
      e,
      closeButtonRef,
      internalDialogRef,
      allowCloseOnBackdropClick,
      mouseDownTarget.current,
    ),
    [allowCloseOnBackdropClick, closeButtonRef, internalDialogRef],
  );
  const onClose = useCallback(
    (e) => dialogOnCloseHandler(e, closeButtonRef, restProps.onClose),
    [closeButtonRef, restProps.onClose],
  );
  const onKeyDown = useCallback(
    (e) => dialogOnKeyDownHandler(
      e,
      closeButtonRef,
      primaryButtonRef,
      allowCloseOnEscapeKey,
      allowPrimaryActionOnEnterKey,
    ),
    [
      allowCloseOnEscapeKey,
      allowPrimaryActionOnEnterKey,
      closeButtonRef,
      primaryButtonRef,
    ],
  );

  const onMouseDown = useCallback((e) => {
    mouseDownTarget.current = e.target;
  }, []);

  const events = {
    onCancel,
    onClick,
    onClose,
    onKeyDown,
    onMouseDown,
  };

  if (portalId === undefined) {
    return preRender(
      children,
      color,
      internalDialogRef,
      position,
      size,
      events,
      restProps,
    );
  }

  return createPortal(
    preRender(
      children,
      color,
      internalDialogRef,
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
  children: undefined,
  closeButtonRef: undefined,
  color: undefined,
  dialogRef: undefined,
  portalId: undefined,
  position: 'center',
  preventScrollUnderneath: window.document.body,
  primaryButtonRef: undefined,
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
   * Color to clarify importance and meaning of the modal. Implements
   * [Feedback color collection](/docs/foundation/collections#colors).
   */
  color: PropTypes.oneOf(['success', 'warning', 'danger', 'help', 'info', 'note']),
  /**
   * Reference to dialog element
   */
  dialogRef: PropTypes.shape({
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
