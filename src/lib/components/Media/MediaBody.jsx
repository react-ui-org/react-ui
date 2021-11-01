import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
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

export const MediaBodyWithContext = withProviderContext(MediaBody, 'MediaBody');

export default MediaBodyWithContext;
