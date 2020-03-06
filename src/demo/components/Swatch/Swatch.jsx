import PropTypes from 'prop-types';
import React from 'react';
import styles from './Swatch.scss';

const Swatch = (props) => {
  const style = {
    backgroundColor: `var(--rui-color-${props.color})`,
  };

  return (
    <div className={styles.root} title={props.color}>
      <div className={styles.field} style={style} />
      <div className={styles.label}>
        {props.color}
      </div>
    </div>
  );
};

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Swatch;
