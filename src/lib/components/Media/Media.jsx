import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import styles from './Media.scss';

export const Media = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.media}>
      {children}
    </div>
  );
};

Media.propTypes = {
  /**
   * Nested elements. Supported types are:
   * * `MediaBody`
   * * `MediaObject`
   */
  children: PropTypes.node.isRequired,
};

export const MediaWithContext = withProviderContext(Media, 'Media');

export default MediaWithContext;
