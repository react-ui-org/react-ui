import PropTypes from 'prop-types';
import React from 'react';
import styles from './Icon.scss';
import loadMaterialDesignIcons from './load-material-design-icons';

loadMaterialDesignIcons();

const Icon = (props) => {
  let iconClass = styles.root;

  if (props.size === 'small') {
    iconClass = styles.rootSizeSmall;
  } else if (props.size === 'large') {
    iconClass = styles.rootSizeLarge;
  } else if (props.size === 'larger') {
    iconClass = styles.rootSizeLarger;
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
  size: PropTypes.oneOf(['small', 'medium', 'large', 'larger']),
};

export default Icon;
