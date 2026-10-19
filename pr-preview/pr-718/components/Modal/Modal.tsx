import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import type {
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  RefObject,
  SyntheticEvent,
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
import type {
  ModalEvents,
  ModalPosition,
  ModalProps,
  ModalSize,
} from './Modal.types';

const preRender = (
  children: ReactNode,
  color: ModalProps['color'],
  dialogRef: RefObject<HTMLDialogElement | null>,
  position: ModalPosition,
  size: ModalSize,
  events: ModalEvents,
  restProps: Omit<ModalProps, 'children' | 'color' | 'position' | 'size'>,
) => (
  <dialog
    {...transferProps(restProps)}
    {...transferProps(events)}
    className={classNames(
      styles.root,
      color && getRootColorClassName(styles, color),
      getSizeClassName(styles, size),
      getPositionClassName(styles, position),
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
}: ModalProps) => {
  const internalDialogRef = useRef<HTMLDialogElement>(null);
  const mouseDownTarget = useRef<EventTarget | null>(null);

  useEffect(() => {
    internalDialogRef.current?.showModal();
  }, []);

  // We need to have a reference to the dialog element to be able to call its methods,
  // but at the same time we want to expose this reference to the parent component for
  // case someone wants to call dialog methods from outside the component.
  useImperativeHandle(dialogRef, () => internalDialogRef.current as HTMLDialogElement);

  useModalFocus(autoFocus, internalDialogRef, primaryButtonRef);
  useModalScrollPrevention(preventScrollUnderneath);

  const onCancel = useCallback(
    (e: SyntheticEvent<HTMLDialogElement>) => {
      if (e.target !== internalDialogRef.current) {
        return;
      }
      dialogOnCancelHandler(e, closeButtonRef, restProps.onCancel);
    },
    [closeButtonRef, restProps.onCancel],
  );
  const onClick = useCallback(
    (e: MouseEvent<HTMLDialogElement>) => dialogOnClickHandler(
      e,
      closeButtonRef,
      internalDialogRef,
      allowCloseOnBackdropClick,
      mouseDownTarget.current,
    ),
    [allowCloseOnBackdropClick, closeButtonRef, internalDialogRef],
  );
  const onClose = useCallback(
    (e: SyntheticEvent<HTMLDialogElement>) => dialogOnCloseHandler(e, closeButtonRef, restProps.onClose),
    [closeButtonRef, restProps.onClose],
  );
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDialogElement>) => dialogOnKeyDownHandler(
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

  const onMouseDown = useCallback((e: MouseEvent<HTMLDialogElement>) => {
    mouseDownTarget.current = e.target;
  }, []);

  const events: ModalEvents = {
    onCancel,
    onClick,
    onClose,
    onKeyDown,
    onMouseDown,
  };

  // `preRender` only forwards the ref to the `<dialog>` element, it does not read it during render.
  /* eslint-disable react-hooks/refs */
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
  /* eslint-enable react-hooks/refs */
};

export const ModalWithGlobalProps = withGlobalProps<ModalProps, never>(Modal, 'Modal');

export default ModalWithGlobalProps;
