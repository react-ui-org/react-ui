import PropTypes from 'prop-types';
import React from 'react';
import styles from './Card.scss';

export const Card = (props) => {
  const {
    children,
    disabled,
    id,
    raised,
    type,
  } = props;

  let typeClass = styles.flat;
  if (type === 'warning') {
    typeClass = styles.warning;
  } else if (type === 'error') {
    typeClass = styles.error;
  } else if (type === 'bordered') {
    typeClass = styles.bordered;
  }

  let disabledClass = '';
  if (disabled) {
    disabledClass = styles.isRootDisabled;
  }

  let raisedClass = '';
  if (raised) {
    raisedClass = styles.isRootRaised;
  }

  return (
    <div
      className={(`
        ${styles.root}
        ${typeClass}
        ${disabledClass}
        ${raisedClass}
      `).trim()}
      id={id}
    >
      {children}
    </div>
  );
};

Card.defaultProps = {
  disabled: false,
  id: undefined,
  raised: false,
  type: 'flat',
};

Card.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  raised: PropTypes.bool,
  type: PropTypes.oneOf(['flat', 'bordered', 'warning', 'error']),
};

export default Card;