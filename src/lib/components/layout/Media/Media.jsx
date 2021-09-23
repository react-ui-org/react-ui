import React from 'react';
import elementOfType from '../../../propTypes/elementOfType';
import { withProviderContext } from '../../../provider';
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
  children: elementOfType(['MediaBody', 'MediaObject']).isRequired,
};

export const MediaWithContext = withProviderContext(Media, 'Media');

export default MediaWithContext;
