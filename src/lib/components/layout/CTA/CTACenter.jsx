import PropTypes from 'prop-types';
import React from 'react';
import styles from './CTA.scss';

export const CTACenter = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.center}>
      {children}
    </div>
  );
};

CTACenter.propTypes = {
  /**
   * Content of the center element.
   */
  children: PropTypes.node.isRequired,
};

export default CTACenter;
