import PropTypes from 'prop-types';
import React from 'react';
import styles from './Media.scss';

const MediaBody = ({ children }) => (
  <div className={styles.body}>
    {children}
  </div>
);

MediaBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MediaBody;
