import PropTypes from 'prop-types';
import React from 'react';
import styles from './DocumentationLayout.scss';

const DocumentationLayout = props => (
  <div className={styles.root}>
    {props.children}
  </div>
);

DocumentationLayout.defaultProps = {
  children: null,
};

DocumentationLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default DocumentationLayout;
