import PropTypes from 'prop-types';
import React from 'react';
import styles from './CenteredCTA.scss';

const CenteredCTAStart = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.start}>
      {children}
    </div>
  );
};

CenteredCTAStart.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CenteredCTAStart;
