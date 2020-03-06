import PropTypes from 'prop-types';
import React from 'react';
import styles from './Layout.scss';

const LayoutContent = (props) => (
  <main className={styles.content}>
    {props.children}
  </main>
);

LayoutContent.defaultProps = {
  children: null,
};

LayoutContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default LayoutContent;
