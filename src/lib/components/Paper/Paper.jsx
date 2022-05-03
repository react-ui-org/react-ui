import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './Paper.scss';

export const Paper = ({
  children,
  id,
  muted,
  raised,
}) => (
  <div
    className={classNames(
      styles.root,
      muted && styles.rootMuted,
      raised && styles.rootRaised,
    )}
    id={id}
  >
    {children}
  </div>
);

Paper.defaultProps = {
  id: undefined,
  muted: false,
  raised: false,
};

Paper.propTypes = {
  /**
   * Content to be placed onto Paper.
   */
  children: PropTypes.node.isRequired,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Visually suppress Paper.
   */
  muted: PropTypes.bool,
  /**
   * Add shadow to pull the Paper above surface.
   */
  raised: PropTypes.bool,
};

export const PaperWithGlobalProps = withGlobalProps(Paper, 'Paper');

export default PaperWithGlobalProps;
