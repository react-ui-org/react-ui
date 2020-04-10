import PropTypes from 'prop-types';
import React from 'react';
import styles from './Row.scss';

const RowStart = ({ children }) => (
  <div className={styles.start}>
    {children}
  </div>
);

RowStart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RowStart;
