import PropTypes from 'prop-types';
import React from 'react';
import styles from './Alert.scss';

const Alert = (props) => {
  let rootTypeClass = styles.note;

  if (props.type) {
    if (props.type === 'success') {
      rootTypeClass = styles.success;
    } else if (props.type === 'error') {
      rootTypeClass = styles.error;
    } else if (props.type === 'warning') {
      rootTypeClass = styles.warning;
    } else if (props.type === 'info') {
      rootTypeClass = styles.info;
    } else if (props.type === 'help') {
      rootTypeClass = styles.help;
    }
  }

  return (
    <div
      className={(`
        ${styles.root}
        ${rootTypeClass}
      `).trim()}
      id={props.id}
      role="alert"
    >
      {props.icon && (
        <div className={styles.icon}>
          {props.icon}
        </div>
      )}
      <div
        className={styles.message}
        {...(props.id && { id: `${props.id}__content` })}
      >
        {props.children}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  icon: null,
  id: undefined,
  type: 'note',
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  icon: PropTypes.element,
  id: PropTypes.string,
  type: PropTypes.oneOf(['error', 'help', 'info', 'note', 'success', 'warning']),
};

export default Alert;
