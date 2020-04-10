import PropTypes from 'prop-types';
import React from 'react';
import styles from './CenteredCTA.scss';

const CenteredCTACenter = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.center}>
      {children}
    </div>
  );
};

CenteredCTACenter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CenteredCTACenter;
