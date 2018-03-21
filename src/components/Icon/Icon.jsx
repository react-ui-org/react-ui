import PropTypes from 'prop-types';
import React from 'react';
import styles from './Icon.scss';
import loadMaterialDesignIcons from './load-material-design-icons';

loadMaterialDesignIcons();

const Icon = (props) => {
  let iconClass = styles.root;

  if (props.size === 'large') {
    iconClass = styles.isRootLarge;
  } else if (props.size === 'larger') {
    iconClass = styles.isRootLarger;
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
  size: 'default',
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['default', 'large', 'larger']),
};

export default Icon;
