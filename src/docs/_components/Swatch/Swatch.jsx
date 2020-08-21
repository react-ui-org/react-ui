import PropTypes from 'prop-types';
import React from 'react';
import styles from './Swatch.scss';

// TODO We don't have `getComputedStyle()` in Node. Use a hook maybe?
// const getCssProperty = (propertyName) => (
//   getComputedStyle(document.documentElement).getPropertyValue(propertyName)
// );

const Swatch = ({ color }) => {
  const colorCustomProperty = `--rui-color-${color}`;
  // const colorValue = getCssProperty(colorCustomProperty);

  return (
    <div className={styles.root}>
      <div
        className={styles.swatch}
        style={{ backgroundColor: `var(${colorCustomProperty})` }}
      />
      <div className={styles.title}>
        <strong>{color}</strong><br />
        {/* {colorValue.toUpperCase()}<br /> */}
        <code>{colorCustomProperty}</code>
      </div>
    </div>
  );
};

Swatch.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Swatch;
