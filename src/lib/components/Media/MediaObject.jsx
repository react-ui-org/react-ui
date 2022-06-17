import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Media.scss';

export const MediaObject = ({
  children,
  id,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div className={styles.object} id={id}>
      {children}
    </div>
  );
};

MediaObject.defaultProps = {
  children: null,
  id: undefined,
};

MediaObject.propTypes = {
  /**
   * Accompanying media object for the Media layout, eg. an image. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const MediaObjectWithGlobalProps = withGlobalProps(MediaObject, 'MediaObject');

export default MediaObjectWithGlobalProps;
