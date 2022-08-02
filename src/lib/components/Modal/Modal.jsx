import PropTypes from 'prop-types';
import React, {
  useEffect, useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './Modal.scss';

const preRender = (
  children,
  childrenWrapperRef,
  id,
  closeButtonRef,
  position,
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
      id={id}
      onClick={() => {
        if (closeButtonRef?.current != null) {
          closeButtonRef.current.click();
        }
      }}
      role="presentation"
    >
      <div
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
  id,
  portalId,
  position,
  primaryButtonRef,
  size,
}) => {
  const childrenWrapperRef = useRef();

  const keyPressHandler = (e) => {
    if (e.keyCode === 27 && closeButtonRef?.current != null) {
      closeButtonRef.current.click();
    }

    if (e.keyCode === 13 && e.target.nodeName !== 'BUTTON' && primaryButtonRef?.current != null) {
      primaryButtonRef.current.click();
    }
  };

  useEffect(() => {
    window.document.addEventListener('keydown', keyPressHandler, false);

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
          return () => {};
        }
      }

      if (primaryButtonRef?.current != null) {
        primaryButtonRef.current.focus();
      }
    }

    return () => {
      window.document.removeEventListener('keydown', keyPressHandler, false);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (portalId === null) {
    return preRender(
      children,
      childrenWrapperRef,
      id,
      closeButtonRef,
      position,
      size,
    );
  }

  return createPortal(
    preRender(
      children,
      childrenWrapperRef,
      id,
      closeButtonRef,
      position,
      size,
    ),
    document.getElementById(portalId),
  );
};

Modal.defaultProps = {
  autoFocus: true,
  children: null,
  closeButtonRef: null,
  id: undefined,
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
   * ID of the root HTML element.
   */
  id: PropTypes.string,
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
