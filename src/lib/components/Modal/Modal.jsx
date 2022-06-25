import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './Modal.scss';

export class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.childrenWrapperRef = React.createRef();

    this.keyPressHandler = this.keyPressHandler.bind(this);
  }

  componentDidMount() {
    const {
      autoFocus,
      primaryButtonRef,
    } = this.props;

    window.document.addEventListener('keydown', this.keyPressHandler, false);

    // If `autoFocus` is set to `true`, following code finds first form field element
    // (input, textarea or select) or primary button and auto focuses it. This is necessary
    // to have focus on one of those elements to be able to submit form by pressing Enter key.
    if (autoFocus) {
      if (this.childrenWrapperRef?.current != null) {
        const childrenWrapperElement = this.childrenWrapperRef.current;
        const childrenElements = childrenWrapperElement.querySelectorAll('*');
        const formFieldEl = Array.from(childrenElements).find(
          (element) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName),
        );

        if (formFieldEl) {
          formFieldEl.focus();
          return;
        }
      }

      if (primaryButtonRef?.current != null) {
        primaryButtonRef.current.focus();
      }
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.keyPressHandler, false);
  }

  keyPressHandler(e) {
    const {
      closeButtonRef,
      primaryButtonRef,
    } = this.props;

    if (e.keyCode === 27 && closeButtonRef?.current != null) {
      closeButtonRef.current.click();
    }

    if (e.keyCode === 13 && e.target.nodeName !== 'BUTTON' && primaryButtonRef?.current != null) {
      primaryButtonRef.current.click();
    }
  }

  preRender() {
    const {
      children,
      id,
      closeButtonRef,
      position,
      size,
    } = this.props;

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
          ref={this.childrenWrapperRef}
        >
          {children}
        </div>
      </div>
    );
  }

  render() {
    const { portalId } = this.props;

    if (portalId === null) {
      return this.preRender();
    }

    return createPortal(this.preRender(), document.getElementById(portalId));
  }
}

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
   * If `true`, focus the first input element in the modal or primary button when the modal is opened.
   */
  autoFocus: PropTypes.bool,
  /**
   * Nested elements. Supported types are:
   *
   * * `ModalHead`
   * * `ModalBody`
   * * `ModalFooter`
   *
   * At least `ModalBody` is required.
   */
  children: PropTypes.node,
  /**
   * Reference to close button element. It is used to close modal when Escape key is pressed.
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
   * If set, the modal is rendered in the React Portal with that ID.
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
