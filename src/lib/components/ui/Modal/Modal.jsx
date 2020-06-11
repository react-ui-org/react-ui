import PropTypes from 'prop-types';
import React from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button';
import {
  Toolbar,
  ToolbarItem,
} from '../../layout/Toolbar';
import transferProps from '../../../utils/transferProps';
import { withTranslationContext } from '../../../translation';
import styles from './Modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isContentOverflowing: false,
    };

    this.childrenWrapperRef = React.createRef();
    this.submitButtonRef = React.createRef();

    this.setGradient = this.setGradient.bind(this);
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

  setGradient() {
    if (!this.state.isContentOverflowing) {
      this.setState({ isContentOverflowing: true });
    }
  }

  keyPressHandler(e) {
    const { actions } = this.props;

    if (e.keyCode === 27 && this.props.closeHandler) {
      this.props.closeHandler();
    }

    if (e.keyCode === 13 && e.target.nodeName !== 'BUTTON') {
      const submitAction = actions.find((action) => action.type === 'submit');

      if (submitAction && !submitAction.disabled) {
        submitAction.clickHandler(e);
      }
    }
  }

  preRender() {
    const sizeClass = (size) => {
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

    return (
      <div
        className={styles.overlay}
        id={this.props.id}
        onClick={(e) => {
          if (this.props.closeHandler) {
            this.props.closeHandler(e);
          }
        }}
        onScroll={this.setGradient}
        role="presentation"
      >
        <div
          className={`
            ${styles.root}
            ${sizeClass(this.props.size)}
            ${this.state.isContentOverflowing ? styles.isContentOverflowing : ''}
          `.trim()}
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="presentation"
        >
          <div className={styles.head}>
            <h3
              className={styles.headTitle}
              {...(this.props.id && { id: `${this.props.id}__title` })}
            >
              {this.props.title}
            </h3>
            {this.props.closeHandler && (
              <button
                type="button"
                className={styles.close}
                onClick={this.props.closeHandler}
                title={this.props.translations.close}
                {...(this.props.id && { id: `${this.props.id}__closeModalHeaderButton` })}
              >
                ×
              </button>
            )}
          </div>
          <div
            className={styles.body}
            ref={this.childrenWrapperRef}
            {...(this.props.id && { id: `${this.props.id}__content` })}
          >
            {this.props.children}
          </div>
          <div className={styles.footer}>
            <Toolbar justify="center" dense>
              {this.props.actions.map((action) => (
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
              {this.props.closeHandler && (
                <ToolbarItem>
                  <Button
                    clickHandler={this.props.closeHandler}
                    label={this.props.translations.close}
                    priority="flat"
                    {...(this.props.id && { id: `${this.props.id}__closeModalFooterButton` })}
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
  size: PropTypes.oneOf(['small', 'medium', 'large', 'auto']),
  title: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(Modal, 'Modal');
