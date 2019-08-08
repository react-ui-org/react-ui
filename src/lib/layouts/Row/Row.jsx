import PropTypes from 'prop-types';
import React from 'react';
import styles from './Row.scss';

const Row = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.row}>
      {children}
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Row;
