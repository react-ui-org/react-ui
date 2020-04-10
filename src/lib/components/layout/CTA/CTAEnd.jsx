import PropTypes from 'prop-types';
import React from 'react';
import styles from './CenteredCTA.scss';

const CenteredCTAEnd = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.end}>
      {children}
    </div>
  );
};

CenteredCTAEnd.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CenteredCTAEnd;
