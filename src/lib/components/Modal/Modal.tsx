import React, {
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import styles from './Modal.scss';
import ModalProps, {
  ChildrenWrapperRef, PreRenderProps,
} from './Modal.types';

const preRender = ({
  children,
  childrenWrapperRef,
  closeButtonRef,
  position,
  size,
  ...restProps
}
: PreRenderProps) => {
  const sizeClass = (modalSize: PreRenderProps['size']) => {
    if (modalSize === 'small') {
      return styles.isRootSizeSmall;
    }

    if (modalSize === 'medium') {
      return styles.isRootSizeMedium;
    }

    if (modalSize === 'large') {
      return styles.isRootSizeLarge;
    }

    if (modalSize === 'fullscreen') {
      return styles.isRootSizeFullscreen;
    }

    return styles.isRootSizeAuto;
  };

  const positionClass = (modalPosition: PreRenderProps['position']) => {
    if (modalPosition === 'top') {
      return styles.isRootPositionTop;
    }

    return styles.isRootPositionCenter;
  };

  return (
    <div
      className={styles.backdrop}
      onClick={() => {
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
          sizeClass(size),
          positionClass(position),
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
};

export const Modal: React.FunctionComponent<ModalProps> = ({
  autoFocus = true,
  children,
  closeButtonRef,
  portalId,
  position = 'center',
  primaryButtonRef,
  size = 'medium',
  ...restProps
}) => {
  const childrenWrapperRef: ChildrenWrapperRef = useRef(null);

  const keyPressHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && closeButtonRef?.current != null) {
      closeButtonRef.current.click();
    }

    if (e.key === 'Enter' && (e.target as HTMLElement).nodeName !== 'BUTTON' && primaryButtonRef?.current != null) {
      primaryButtonRef.current.click();
    }
  };

  useEffect(() => {
    window.document.addEventListener('keydown', keyPressHandler, false);
    const removeKeyPressHandler = () => {
      window.document.removeEventListener('keydown', keyPressHandler, false);
    };

    // If `autoFocus` is set to `true`, following code finds first form field element
    // (input, textarea or select) or primary button and auto focuses it. This is necessary
    // to have focus on one of those elements to be able to submit form by pressing Enter key.
    if (autoFocus) {
      if (childrenWrapperRef.current != null) {
        const childrenWrapperElement = childrenWrapperRef.current;
        const childrenElements = childrenWrapperElement.querySelectorAll<HTMLElement>('*');
        const formFieldEl = Array.from(childrenElements).find(
          (element) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName) && !(element as HTMLButtonElement).disabled,
        ) as HTMLElement;

        if (formFieldEl) {
          formFieldEl.focus();
          return removeKeyPressHandler;
        }
      }

      if (primaryButtonRef?.current != null) {
        primaryButtonRef.current.focus();
      }
    }

    return removeKeyPressHandler;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (portalId === undefined) {
    return preRender({
      children,
      childrenWrapperRef,
      closeButtonRef,
      position,
      size,
      ...restProps,
    });
  }

  return createPortal(
    preRender({
      children,
      childrenWrapperRef,
      closeButtonRef,
      position,
      size,
      ...restProps,
    }),
    // eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
    document.getElementById(portalId)!,
  );
};

export const ModalWithGlobalProps = withGlobalProps(Modal, 'Modal');

export default ModalWithGlobalProps;
