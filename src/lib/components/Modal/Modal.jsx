import PropTypes from 'prop-types';
import React, {
  useEffect,
  useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import styles from './Modal.scss';

const preRender = (
  children,
  childrenWrapperRef,
  closeButtonRef,
  position,
  restProps,
  size,
) => {
  const sizeClass = (modalSize) => {
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

  const positionClass = (modalPosition) => {
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
        role="presentation"
        ref={childrenWrapperRef}
      >
        {children}
      </div>
    </div>
  );
};

export const Modal = ({
  autoFocus,
  children,
  closeButtonRef,
  portalId,
  position,
  primaryButtonRef,
  size,
  ...restProps
}) => {
  const childrenWrapperRef = useRef();

  const keyPressHandler = (e) => {
    if (e.key === 'Escape' && closeButtonRef?.current != null) {
      closeButtonRef.current.click();
    }

    if (e.key === 'Enter' && e.target.nodeName !== 'BUTTON' && primaryButtonRef?.current != null) {
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
      if (childrenWrapperRef?.current != null) {
        const childrenWrapperElement = childrenWrapperRef.current;
        const childrenElements = childrenWrapperElement.querySelectorAll('*');
        const formFieldEl = Array.from(childrenElements).find(
          (element) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName),
        );

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
  primaryButtonRef: null,
  size: 'medium',
};

Modal.propTypes = {
  /**
   * If `true`, focus the first input element in the modal or primary button (referenced by the `primaryButtonRef` prop)
   * when the modal is opened.
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
