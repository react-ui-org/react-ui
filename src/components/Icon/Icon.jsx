import PropTypes from 'prop-types';
import React from 'react';
import styles from './Icon.scss';

const cache = {};

function importAll(r) {
  r.keys().forEach((key) => { cache[key] = r(key); });
}

importAll(require.context('!svg-sprite-loader!material-design-icons/', true, /[\\/]svg[\\/]production[\\/]ic_.*_48px\.svg$/));

const Icon = (props) => {
  let iconClass = styles.root;

  if (props.size === 'large') {
    iconClass = styles.isRootLarge;
  } else if (props.size === 'small') {
    iconClass = styles.isRootSmall;
  }

  return (
    <svg
      style={{ fill: 'currentColor' }}
      className={iconClass}
    >
      <use xlinkHref={`#ic_${props.icon}_48px`} />
    </svg>
  );
};

Icon.defaultProps = {
  size: 'medium',
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Icon;
