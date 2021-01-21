import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../../provider';
import styles from './CTA.scss';

export const CTAEnd = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.end}>
      {children}
    </div>
  );
};

CTAEnd.propTypes = {
  /**
   * Content of the end element.
   */
  children: PropTypes.node.isRequired,
};

export const CTAEndWithContext = withProviderContext(CTAEnd, 'CTAEnd');

export default CTAEndWithContext;
