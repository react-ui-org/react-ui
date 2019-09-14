import PropTypes from 'prop-types';
import React from 'react';
import styles from './DocumentationLayout.scss';

const DocumentationLayoutSidebar = (props) => (
  <aside className={styles.sidebar}>
    {props.children}
  </aside>
);

DocumentationLayoutSidebar.defaultProps = {
  children: null,
};

DocumentationLayoutSidebar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default DocumentationLayoutSidebar;
