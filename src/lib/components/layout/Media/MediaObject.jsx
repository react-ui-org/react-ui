import PropTypes from 'prop-types';
import React from 'react';
import styles from './Media.scss';

export const MediaObject = ({ children }) => (
  <div className={styles.object}>
    {children}
  </div>
);

MediaObject.propTypes = {
  /**
   * Accompanying media object for the Media layout, eg. an image.
   */
  children: PropTypes.node.isRequired,
};

export default MediaObject;
