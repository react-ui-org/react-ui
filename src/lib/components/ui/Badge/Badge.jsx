import PropTypes from 'prop-types';
import React from 'react';
import styles from './Badge.scss';

export const Badge = (props) => {
  const {
    id,
    label,
    priority,
    type,
  } = props;

  let rootTypeClass = styles.note;
  let rootPriorityClass = '';

  if (type) {
    if (type === 'success') {
      rootTypeClass = styles.success;
    } else if (type === 'error') {
      rootTypeClass = styles.error;
    } else if (type === 'warning') {
      rootTypeClass = styles.warning;
    } else if (type === 'info') {
      rootTypeClass = styles.info;
    } else if (type === 'help') {
      rootTypeClass = styles.help;
    } else if (type === 'light') {
      rootTypeClass = styles.light;
    }
  }

  if (priority === 'outline') {
    rootPriorityClass = styles.outline;
  }

  return (
    <div
      className={(`
        ${styles.root}
        ${rootPriorityClass}
        ${rootTypeClass}
      `).trim()}
      id={id}
    >
      {label}
    </div>
  );
};

Badge.defaultProps = {
  id: undefined,
  priority: 'default',
  type: 'note',
};

Badge.propTypes = {
  id: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  priority: PropTypes.oneOf(['default', 'outline']),
  type: PropTypes.oneOf(['error', 'help', 'info', 'note', 'success', 'warning', 'light']),
};

export default Badge;
