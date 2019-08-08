import PropTypes from 'prop-types';
import React from 'react';
import styles from './Row.scss';

const RowLeft = ({ children }) => (
  <div className={styles.left}>
    {children}
  </div>
);

RowLeft.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default RowLeft;
