import PropTypes from 'prop-types';
import React from 'react';
import styles from './Center.scss';

export const Center = (props) => (
  <div className={styles.root}>
    <div>
      {props.children}
    </div>
  </div>
);

Center.defaultProps = {
  children: null,
};

Center.propTypes = {
  children: PropTypes.node,
};

export default Center;
