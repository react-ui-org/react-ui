import PropTypes from 'prop-types';
import React from 'react';
import styles from './LayoutCenter.scss';

const LayoutCenter = (props) => (
  <div className={styles.root}>
    <div>
      {props.children}
    </div>
  </div>
);

LayoutCenter.defaultProps = {
  children: null,
};

LayoutCenter.propTypes = {
  children: PropTypes.element,
};

export default LayoutCenter;
