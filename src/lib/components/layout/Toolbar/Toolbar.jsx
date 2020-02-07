import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toolbar.scss';

const Toolbar = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.toolbar}>
      {children}
    </div>
  );
};

Toolbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Toolbar;
