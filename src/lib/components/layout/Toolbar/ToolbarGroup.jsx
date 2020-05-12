import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toolbar.scss';

const ToolbarGroup = (props) => {
  const {
    align,
    children,
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
        alignClass(align),
      ].join(' ')}
    >
      {children}
    </div>
  );
};

ToolbarGroup.defaultProps = {
  align: 'top',
};

ToolbarGroup.propTypes = {
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  children: PropTypes.node.isRequired,
};

export default ToolbarGroup;
