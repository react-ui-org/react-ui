import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import { withTranslationContext } from '../../../translation';
import styles from './Modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isContentOverflowing: false,
    };

    this.setGradient = this.setGradient.bind(this);
    this.pressEscapeHandler = this.pressEscapeHandler.bind(this);
  }

  componentDidMount() {
    window.document.addEventListener('keydown', this.pressEscapeHandler, false);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.pressEscapeHandler, false);
  }

  setGradient() {
    if (!this.state.isContentOverflowing) {
      this.setState({ isContentOverflowing: true });
    }
  }

  pressEscapeHandler(e) {
    if (e.keyCode === 27 && this.props.closeHandler) {
      this.props.closeHandler();
    }
  }

  render() {
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
            {...(this.props.id && { id: `${this.props.id}__content` })}
          >
            {this.props.children}
          </div>
          <div className={styles.footer}>
            {this.props.actions.map((action) => (
              <Button
                clickHandler={action.clickHandler}
                disabled={action.disabled}
                id={action.id || undefined}
                key={action.label}
                label={action.label}
                loadingIcon={action.loadingIcon}
                variant={action.variant}
                type={action.type || 'button'}
              />
            ))}
            {this.props.closeHandler && (
              <Button
                clickHandler={this.props.closeHandler}
                label={this.props.translations.close}
                priority="flat"
                {...(this.props.id && { id: `${this.props.id}__closeModalFooterButton` })}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  actions: [],
  closeHandler: null,
  id: undefined,
  size: 'medium',
};

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    clickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    loadingIcon: PropTypes.element,
    type: PropTypes.string,
    variant: PropTypes.string,
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  closeHandler: PropTypes.func,
  id: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large', 'auto']),
  title: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(Modal, 'Modal');
