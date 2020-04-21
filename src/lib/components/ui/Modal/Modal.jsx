import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import transferProps from '../../../utils/transferProps';
import { withTranslationContext } from '../../../translation';
import {
  Toolbar,
  ToolbarItem,
} from '../../layout/Toolbar';
import Button from '../Button';
import ScrollView from '../ScrollView';
import styles from './Modal.scss';

class Modal extends React.Component {
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
      scrollMode,
      scrollViewEndShadowStyle,
      scrollViewShadowSize,
      scrollViewStartShadowStyle,
      size,
      title,
      translations,
    } = this.props;

    const sizeClass = () => {
      if (size === 'small') {
        return styles.isRootSmall;
      }

      if (size === 'medium') {
        return styles.isRootMedium;
      }

      if (size === 'large') {
        return styles.isRootLarge;
      }

      return styles.isRootAuto;
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

      if (scrollMode === 'body') {
        return (
          <div
            className={[
              styles.body,
              styles.isBodyScrollable,
            ].join(' ')}
          >
            <ScrollView
              customStartShadowStyle={scrollViewStartShadowStyle}
              customEndShadowStyle={scrollViewEndShadowStyle}
              shadowSize={scrollViewShadowSize}
            >
              {content}
            </ScrollView>
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
        className={styles.overlay}
        id={id}
        onClick={(e) => {
          if (closeHandler) {
            closeHandler(e);
          }
        }}
        role="presentation"
      >
        <div
          className={`
            ${styles.root}
            ${sizeClass()}
          `.trim()}
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
          <div className={styles.footer}>
            <Toolbar justify="center" dense>
              {actions.map((action) => (
                <ToolbarItem key={action.label}>
                  <Button
                    {...transferProps(action)}
                    clickHandler={action.clickHandler}
                    disabled={action.disabled}
                    id={action.id || undefined}
                    label={action.label}
                    loadingIcon={action.loadingIcon}
                    ref={this.submitButtonRef}
                    type="button"
                    variant={action.variant}
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
  scrollMode: 'body',
  scrollViewEndShadowStyle: {
    background: 'radial-gradient(farthest-side at center bottom, rgba(0, 0, 0, 0.16) 0%, rgba(0, 0, 0, 0.06) 40%, rgba(0, 0, 0, 0.02) 85%, rgba(0, 0, 0, 0) 100%)',
  },
  scrollViewShadowSize: '16px',
  scrollViewStartShadowStyle: {
    background: 'radial-gradient(farthest-side at center top, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.05) 60%, rgba(0, 0, 0, 0.02) 85%, rgba(0, 0, 0, 0) 100%)',
  },
  size: 'medium',
};

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    clickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    loadingIcon: PropTypes.node,
    variant: PropTypes.string,
  })),
  autoFocus: PropTypes.bool,
  children: PropTypes.node.isRequired,
  closeHandler: PropTypes.func,
  id: PropTypes.string,
  portalId: PropTypes.string,
  scrollMode: PropTypes.oneOf(['body', 'modal']),
  scrollViewEndShadowStyle: PropTypes.shape({
    background: PropTypes.string,
    boxShadow: PropTypes.string,
  }),
  scrollViewShadowSize: PropTypes.string,
  scrollViewStartShadowStyle: PropTypes.shape({
    background: PropTypes.string,
    boxShadow: PropTypes.string,
  }),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'auto']),
  title: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(Modal, 'Modal');
