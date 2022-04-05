import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Media.scss';

export const MediaBody = ({ children }) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div className={styles.body}>
      {children}
    </div>
  );
};

MediaBody.defaultProps = {
  children: null,
};

MediaBody.propTypes = {
  /**
   * Content of the media layout. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
};

export const MediaBodyWithContext = withProviderContext(MediaBody, 'MediaBody');

export default MediaBodyWithContext;
