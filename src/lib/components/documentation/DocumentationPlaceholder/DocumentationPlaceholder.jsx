import PropTypes from 'prop-types';
import React from 'react';
import styles from './DocumentationPlaceholder.scss';

const DocumentationPlaceholder = props => (
  <div className={styles.root}>
    {props.text}
  </div>
);

DocumentationPlaceholder.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DocumentationPlaceholder;
