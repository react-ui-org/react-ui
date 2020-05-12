import PropTypes from 'prop-types';
import React from 'react';
import styles from './CTA.scss';

const CTAStart = (props) => {
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
  children: PropTypes.node.isRequired,
};

export default CTAStart;
