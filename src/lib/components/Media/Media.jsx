import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Media.scss';

export const Media = ({ children }) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div className={styles.media}>
      {children}
    </div>
  );
};

Media.defaultProps = {
  children: null,
};

Media.propTypes = {
  /**
   * Nested elements. Supported types are:
   * * `MediaBody`
   * * `MediaObject`
   *
   * If none are provided nothing is rendered.
   */
  children: PropTypes.node,
};

export const MediaWithContext = withProviderContext(Media, 'Media');

export default MediaWithContext;
