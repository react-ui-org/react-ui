import PropTypes from 'prop-types';
import React from 'react';
import styles from './Media.scss';

export const MediaBody = ({ children }) => (
  <div className={styles.body}>
    {children}
  </div>
);

MediaBody.propTypes = {
  /**
   * Content of the media layout.
   */
  children: PropTypes.node.isRequired,
};

export default MediaBody;
