import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import styles from './Paper.module.scss';
import type { PaperProps } from './Paper.types';

export const Paper: React.FunctionComponent<PaperProps> = ({
  children,
  muted = false,
  raised = false,
  ...restProps
}: PaperProps) => (
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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

export const PaperWithGlobalProps = withGlobalProps<PaperProps, never>(Paper, 'Paper');

export default PaperWithGlobalProps;
