import PropTypes from 'prop-types';
import React from 'react';
import styles from './Media.scss';

const MediaObject = ({ children }) => (
  <div className={styles.object}>
    {children}
  </div>
);

MediaObject.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MediaObject;
