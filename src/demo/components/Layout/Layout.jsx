import PropTypes from 'prop-types';
import React from 'react';
import styles from './Layout.scss';

const Layout = (props) => (
  <div className={styles.root}>
    {props.children}
  </div>
);

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default Layout;
