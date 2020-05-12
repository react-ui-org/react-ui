import PropTypes from 'prop-types';
import React from 'react';
import styles from './CTA.scss';

const CTAEnd = (props) => {
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
  children: PropTypes.node.isRequired,
};

export default CTAEnd;
