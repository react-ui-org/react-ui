import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import styles from './Paper.scss';

export const Paper = ({
  children,
  id,
  raised,
}) => (
  <div
    className={[
      styles.root,
      raised ? styles.rootRaised : '',
    ].join(' ')}
    id={id}
  >
    {children}
  </div>
);

Paper.defaultProps = {
  children: null,
  id: undefined,
  raised: false,
};

Paper.propTypes = {
  /**
   * Content to be placed onto Paper.
   */
  children: PropTypes.node,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Add shadow to pull the Paper above surface.
   */
  raised: PropTypes.bool,
};

export const PaperWithContext = withProviderContext(Paper, 'Paper');

export default PaperWithContext;
