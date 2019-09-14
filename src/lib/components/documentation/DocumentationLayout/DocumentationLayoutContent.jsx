import PropTypes from 'prop-types';
import React from 'react';
import styles from './DocumentationLayout.scss';

const DocumentationLayoutContent = (props) => (
  <main className={styles.content}>
    {props.children}
  </main>
);

DocumentationLayoutContent.defaultProps = {
  children: null,
};

DocumentationLayoutContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default DocumentationLayoutContent;
