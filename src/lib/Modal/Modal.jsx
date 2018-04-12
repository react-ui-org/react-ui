import PropTypes from 'prop-types';
import React from 'react';
import Button from '../Button';
import styles from './Modal.scss';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.pressEscapeHandler = this.pressEscapeHandler.bind(this);
  }

  componentWillMount() {
    window.document.addEventListener('keydown', this.pressEscapeHandler, false);
  }

  componentWillUnmount() {
    window.document.removeEventListener('keydown', this.pressEscapeHandler, false);
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
        role="presentation"
      >
        <div
          className={styles.root}
          onClick={(e) => {
            e.stopPropagation();
          }}
          role="presentation"
        >
          <div className={styles.head}>
            <h3 className={styles.headTitle}>
              {this.props.title}
            </h3>
          </div>
          <div className={styles.body}>
            {this.props.children}
          </div>
          <div className={styles.footer}>
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
            <Button
              clickHandler={this.props.closeHandler}
              label="Close"
            />
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
};

export default Modal;
