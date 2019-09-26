import PropTypes from 'prop-types';
import React from 'react';
import Icon from '../Icon';
import styles from './Alert.scss';
import alertTypesIcons from './alertTypesIcons';

const Alert = (props) => {
  let rootTypeClass = styles.note;
  let icon = alertTypesIcons.note;

  if (props.type) {
    if (props.type === 'success') {
      rootTypeClass = styles.success;
      icon = alertTypesIcons.success;
    } else if (props.type === 'error') {
      rootTypeClass = styles.error;
      icon = alertTypesIcons.error;
    } else if (props.type === 'warning') {
      rootTypeClass = styles.warning;
      icon = alertTypesIcons.warning;
    } else if (props.type === 'info') {
      rootTypeClass = styles.info;
      icon = alertTypesIcons.info;
    } else if (props.type === 'help') {
      rootTypeClass = styles.help;
      icon = alertTypesIcons.help;
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
      <div className={styles.icon}>
        <Icon icon={icon} />
      </div>
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
  id: undefined,
  type: 'note',
};

Alert.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  id: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(alertTypesIcons)),
};

export default Alert;
