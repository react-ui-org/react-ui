import PropTypes from 'prop-types';
import React from 'react';
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

export default CTAEnd;
