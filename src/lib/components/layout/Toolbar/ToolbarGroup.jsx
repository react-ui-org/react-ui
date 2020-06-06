import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toolbar.scss';

const ToolbarGroup = (props) => {
  const {
    align,
    children,
    dense,
    nowrap,
  } = props;

  const alignClass = (value) => {
    if (value === 'top') {
      return styles.isAlignedToTop;
    }

    if (value === 'middle') {
      return styles.isAlignedToMiddle;
    }

    if (value === 'bottom') {
      return styles.isAlignedToBottom;
    }

    return styles.isAlignedToBaseline;
  };

  return (
    <div
      className={[
        styles.group,
        dense ? styles.isDense : null,
        nowrap ? styles.isNowrap : null,
        alignClass(align),
      ].join(' ')}
    >
      {children}
    </div>
  );
};

ToolbarGroup.defaultProps = {
  align: 'top',
  dense: false,
  nowrap: false,
};

ToolbarGroup.propTypes = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  children: PropTypes.node.isRequired,
  dense: PropTypes.bool,
  nowrap: PropTypes.bool,
};

export default ToolbarGroup;
