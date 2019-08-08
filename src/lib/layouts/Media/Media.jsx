import PropTypes from 'prop-types';
import React from 'react';
import styles from './Media.scss';

const Media = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.media}>
      {children}
    </div>
  );
};

Media.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Media;
