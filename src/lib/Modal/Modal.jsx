import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import { withTranslationContext } from '../Translation/index';
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
    if (e.keyCode === 27) {
      this.props.closeHandler();
    }
  }

  render() {
    return (
      <div
        className={styles.overlay}
        onClick={this.props.closeHandler}
        onScroll={this.setGradient}
        role="presentation"
      >
        <div
          className={`
            ${styles.root}
            ${this.state.isContentOverflowing ? styles.isContentOverflowing : ''}
          `.trim()}
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="presentation"
        >
          <div className={styles.head}>
            <h3 className={styles.headTitle}>
              {this.props.title}
            </h3>
            <Button
              clickHandler={this.props.closeHandler}
              icon="close"
              isLabelVisible={false}
              label={this.props.translations.close}
              priority="flat"
              size="large"
            />
          </div>
          <div className={styles.body}>
            {this.props.children}
          </div>
          <div className={styles.footer}>
            <span className={styles.button}>
              {this.props.actions.map(action => (
                <Button
                  clickHandler={action.clickHandler}
                  disabled={action.disabled}
                  key={action.label}
                  label={action.label}
                  loading={action.loading}
                  priority="primary"
                  variant={action.variant}
                />
              ))}
            </span>
            <span className={styles.button}>
              <Button
                clickHandler={this.props.closeHandler}
                label={this.props.translations.close}
              />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

Modal.defaultProps = {
  actions: [],
};

Modal.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    clickHandler: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    variant: PropTypes.string,
  })),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  closeHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  translations: PropTypes.shape({
    close: PropTypes.string.isRequired,
  }).isRequired,
};

export default withTranslationContext(Modal);
