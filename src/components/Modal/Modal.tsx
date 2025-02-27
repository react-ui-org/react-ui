import React, {
  ReactNode,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames';
import { transferProps } from '../../helpers/transferProps';
import { getRootColorClassName } from '../_helpers/getRootColorClassName';
import { Color } from '../../types';
import { dialogOnCancelHandler } from './_helpers/dialogOnCancelHandler';
import { dialogOnClickHandler } from './_helpers/dialogOnClickHandler';
import { dialogOnCloseHandler } from './_helpers/dialogOnCloseHandler';
import { dialogOnKeyDownHandler } from './_helpers/dialogOnKeyDownHandler';
import { getPositionClassName } from './_helpers/getPositionClassName';
import { getSizeClassName } from './_helpers/getSizeClassName';
import { useModalFocus } from './_hooks/useModalFocus';
import { useModalScrollPrevention } from './_hooks/useModalScrollPrevention';
import {
  ModalProps,
  ModalSize,
  ModalVerticalPosition,
  PreRenderRestProps,
} from './Modal.types';
import styles from './Modal.module.scss';

const preRender = (
  children: ReactNode,
  color: Color,
  dialogRef: React.RefObject<HTMLDialogElement | null>,
  position: ModalVerticalPosition,
  size: ModalSize,
  events: {
    onCancel: (e: React.MouseEvent<HTMLDialogElement>) => void,
    onClick: (e: React.MouseEvent<HTMLDialogElement>) => void,
    onClose: (e: React.MouseEvent<HTMLDialogElement>) => void,
    onKeyDown: (e: React.KeyboardEvent<HTMLDialogElement>) => void,
  },
  restProps: PreRenderRestProps,
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

export const Modal: React.FunctionComponent<ModalProps> = ({
  allowCloseOnBackdropClick = true,
  allowCloseOnEscapeKey = true,
  allowPrimaryActionOnEnterKey = true,
  autoFocus = true,
  children,
  closeButtonRef,
  color,
  dialogRef,
  portalId,
  position = 'center',
  preventScrollUnderneath = window.document.body,
  primaryButtonRef,
  size = 'medium',
  ...restProps
}) => {
  const internalDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    internalDialogRef.current?.showModal();
  }, []);

  // We need to have a reference to the dialog element to be able to call its methods,
  // but at the same time we want to expose this reference to the parent component for
  // case someone wants to call dialog methods from outside the component.
  useImperativeHandle(dialogRef, () => {
    if (internalDialogRef.current) {
      return internalDialogRef.current;
    }
    return {} as HTMLDialogElement;
  });

  useModalFocus(autoFocus, internalDialogRef, primaryButtonRef);
  useModalScrollPrevention(preventScrollUnderneath);

  const onCancel = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => dialogOnCancelHandler(e, closeButtonRef, restProps.onCancel),
    [closeButtonRef, restProps.onCancel],
  );
  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => dialogOnClickHandler(
      e,
      closeButtonRef,
      internalDialogRef,
      allowCloseOnBackdropClick,
    ),
    [allowCloseOnBackdropClick, closeButtonRef, internalDialogRef],
  );
  const onClose = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => dialogOnCloseHandler(e, closeButtonRef, restProps.onClose),
    [closeButtonRef, restProps.onClose],
  );
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDialogElement>) => dialogOnKeyDownHandler(
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
  const events = {
    onCancel,
    onClick,
    onClose,
    onKeyDown,
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
    document.getElementById(portalId) as HTMLElement,
  );
};

export const ModalWithGlobalProps = withGlobalProps(Modal, 'Modal');

export default ModalWithGlobalProps;
