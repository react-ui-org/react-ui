import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toolbar.scss';

const Toolbar = (props) => {
  const {
    align,
    children,
  } = props;

  const alignClass = (value) => {
    if (value === 'top') {
      return styles.isToolbarAlignedToTop;
    }

    if (value === 'middle') {
      return styles.isToolbarAlignedToMiddle;
    }

    if (value === 'bottom') {
      return styles.isToolbarAlignedToBottom;
    }

    return styles.isToolbarAlignedToBaseline;
  };

  return (
    <div
      className={[
        styles.toolbar,
        alignClass(align),
      ].join(' ')}
    >
      {children}
    </div>
  );
};

Toolbar.defaultProps = {
  align: 'bottom',
};

Toolbar.propTypes = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Toolbar;
