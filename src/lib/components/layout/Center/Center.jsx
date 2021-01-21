import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import styles from './Center.scss';

export const Center = ({ children }) => (
  <div className={styles.root}>
    <div>
      {children}
    </div>
  </div>
);

Center.defaultProps = {
  children: null,
};

Center.propTypes = {
  /**
   * The content to be centered.
   */
  children: PropTypes.node,
};

export const CenterWithContext = withProviderContext(Center, 'Center');

export default CenterWithContext;
