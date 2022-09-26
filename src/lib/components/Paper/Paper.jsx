import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../_helpers/transferProps';
import styles from './Paper.scss';

export const Paper = ({
  children,
  muted,
  raised,
  ...restProps
}) => (
  <div
    {...transferProps(restProps)}
    className={classNames(
      styles.root,
      muted && styles.isRootMuted,
      raised && styles.isRootRaised,
    )}
  >
    {children}
  </div>
);

Paper.defaultProps = {
  muted: false,
  raised: false,
};

Paper.propTypes = {
  /**
   * Content to be placed onto Paper.
   */
  children: PropTypes.node.isRequired,
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
