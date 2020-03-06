import PropTypes from 'prop-types';
import React from 'react';
import styles from './Layout.scss';

const LayoutSidebar = (props) => (
  <aside className={styles.sidebar}>
    {props.children}
  </aside>
);

LayoutSidebar.defaultProps = {
  children: null,
};

LayoutSidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default LayoutSidebar;
