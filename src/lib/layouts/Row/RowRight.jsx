import PropTypes from 'prop-types';
import React from 'react';
import styles from './Row.scss';

const RowRight = ({ children }) => (
  <div className={styles.right}>
    {children}
  </div>
);

RowRight.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RowRight;
