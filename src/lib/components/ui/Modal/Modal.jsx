import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import transferProps from '../../../utils/transferProps';
import { withProviderContext } from '../../../provider';
import {
  Toolbar,
  ToolbarItem,
} from '../../layout/Toolbar';
import Button from '../Button';
import ScrollView from '../ScrollView';
import styles from './Modal.scss';

export class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.childrenWrapperRef = React.createRef();
    this.submitButtonRef = React.createRef();

    this.keyPressHandler = this.keyPressHandler.bind(this);
  }

  componentDidMount() {
    const { autoFocus } = this.props;

    window.document.addEventListener('keydown', this.keyPressHandler, false);

    // If `autoFocus` is set to `true`, following code finds first form field element
    // (input, textarea or select) or submit button and auto focuses it. This is necessary
    // to have focus on one of those elements to be able to submit form by pressing Enter key.
    if (autoFocus && this.childrenWrapperRef && this.childrenWrapperRef.current) {
      const childrenWrapperElement = this.childrenWrapperRef.current;
      const childrenElements = childrenWrapperElement.querySelectorAll('*');
      const formFieldEl = Array.from(childrenElements).find(
        (element) => ['INPUT', 'TEXTAREA', 'SELECT'].includes(element.nodeName),
      );

      if (formFieldEl) {
        formFieldEl.focus();
        return;
      }

      if (this.submitButtonRef && this.submitButtonRef.current) {
        this.submitButtonRef.current.focus();
      }
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.keyPressHandler, false);
  }

  keyPressHandler(e) {
    const {
      actions,
      closeHandler,
    } = this.props;

    if (e.keyCode === 27 && closeHandler) {
      closeHandler();
    }

    if (e.keyCode === 13 && e.target.nodeName !== 'BUTTON') {
      const submitAction = actions.find((action) => action.type === 'submit');

      if (submitAction && !submitAction.disabled) {
        submitAction.clickHandler(e);
      }
    }
  }

  preRender() {
    const {
      actions,
      children,
      closeHandler,
      id,
      position,
      scrollView,
      size,
      title,
      translations,
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

    const modalBody = () => {
      const content = (
        <div
          ref={this.childrenWrapperRef}
          className={styles.content}
          {...(id && { id: `${id}__content` })}
        >
          {children}
        </div>
      );

      if (scrollView) {
        return (
          <div
            className={[
              styles.body,
              styles.isBodyScrollable,
            ].join(' ')}
          >
            {React.cloneElement(scrollView, scrollView.props, content)}
          </div>
        );
      }

      return (
        <div className={styles.body}>
          {content}
        </div>
      );
    };

    return (
      <div
        className={styles.backdrop}
        id={id}
        onClick={(e) => {
          if (closeHandler) {
            closeHandler(e);
          }
        }}
        role="presentation"
      >
        <div
          className={[
            styles.root,
            sizeClass(size),
            positionClass(position),
          ].join(' ')}
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="presentation"
        >
          <div className={styles.head}>
            <h3
              className={styles.headTitle}
              {...(id && { id: `${id}__title` })}
            >
              {title}
            </h3>
            {closeHandler && (
              <button
                type="button"
                className={styles.close}
                onClick={closeHandler}
                title={translations.close}
                {...(id && { id: `${id}__closeModalHeaderButton` })}
              >
                ×
              </button>
            )}
          </div>
          {modalBody()}
          {(actions.length || closeHandler) && (
            <div className={styles.footer}>
              <Toolbar justify="center" dense>
                {actions.map((action) => (
                  <ToolbarItem key={action.label}>
                    <Button
                      {...transferProps(action)}
                      clickHandler={action.clickHandler}
                      color={action.color}
                      disabled={action.disabled}
                      id={action.id || undefined}
                      label={action.label}
                      loadingIcon={action.loadingIcon}
                      forwardedRef={this.submitButtonRef}
                      type="button"
                    />
                  </ToolbarItem>
                ))}
                {closeHandler && (
                  <ToolbarItem>
                    <Button
                      clickHandler={closeHandler}
                      label={translations.close}
                      priority="flat"
                      {...(id && { id: `${id}__closeModalFooterButton` })}
                    />
                  </ToolbarItem>
                )}
              </Toolbar>
            </div>
          )}
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
  actions: [],
  autoFocus: true,
  closeHandler: null,
  id: undefined,
  portalId: null,
  position: 'center',
  scrollView: (<ScrollView
    customEndShadowStyle={{ background: 'radial-gradient(farthest-side at center bottom, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.06) 40%, rgba(0, 0, 0, 0.02) 85%, rgba(0, 0, 0, 0) 100%)' }}
    customStartShadowStyle={{ background: 'radial-gradient(farthest-side at center top, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 60%, rgba(0, 0, 0, 0.02) 85%, rgba(0, 0, 0, 0) 100%)' }}
    shadowSize="16px"
  />),
  size: 'medium',
};

Modal.propTypes = {
  /**
   * Actions to be rendered in modal footer.
   */
  actions: PropTypes.arrayOf(PropTypes.shape({
    clickHandler: PropTypes.func.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'danger', 'help', 'info', 'note', 'light', 'dark']),
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    loadingIcon: PropTypes.node,
  })),
  /**
   * If `true`, focus the first action in the footer when the modal is opened.
   */
  autoFocus: PropTypes.bool,
  /**
   * Content of the modal.
   */
  children: PropTypes.node.isRequired,
  /**
   * If a function is provided, the close buttons will be displayed.
   */
  closeHandler: PropTypes.func,
  /**
   * ID of the root HTML element. It also serves as a prefix for the element holding the content of
   * the modal and for the close buttons: `<ID>__content`, `<ID>__closeModalHeaderButton`,
   * `<ID>__closeModalFooterButton`.
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
   * The `ScrollView` component to be used as a wrapper of the content to provide body scrolling functionality.
   * If provided only the modal body will be scrollable.
   * If set to `null` the entire modal including header and footer will be scrollable.
   */
  scrollView: PropTypes.element,
  /**
   * Size of the modal.
   */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'fullscreen', 'auto']),
  /**
   * Title displayed in modal header.
   */
  title: PropTypes.string.isRequired,
  /**
   * Translations required by the component.
   */
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export const ModalWithContext = withProviderContext(Modal, 'Modal');

export default ModalWithContext;
