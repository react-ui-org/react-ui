import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import styles from './CTA.scss';

export const CTAStart = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.start}>
      {children}
    </div>
  );
};

CTAStart.propTypes = {
  /**
   * Content of the start element.
   */
  children: PropTypes.node.isRequired,
};

export const CTAStartWithContext = withProviderContext(CTAStart, 'CTAStart');

export default CTAStartWithContext;
