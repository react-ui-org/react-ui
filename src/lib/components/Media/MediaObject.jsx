import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Media.scss';

export const MediaObject = ({ children }) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div className={styles.object}>
      {children}
    </div>
  );
};

MediaObject.defaultProps = {
  children: null,
};

MediaObject.propTypes = {
  /**
   * Accompanying media object for the Media layout, eg. an image. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
};

export const MediaObjectWithContext = withProviderContext(MediaObject, 'MediaObject');

export default MediaObjectWithContext;
