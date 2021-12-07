import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './Toolbar.scss';

export const ToolbarGroup = (props) => {
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
      className={classNames(
        styles.group,
        dense && styles.isDense,
        nowrap && styles.isNowrap,
        alignClass(align),
      )}
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
  /**
   * Vertical alignment of toolbar items in the group.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  /**
   * Grouped ToolbarItems.
   */
  children: PropTypes.node.isRequired,
  /**
   * If `true`, spacing of toolbar items in the group will be reduced.
   */
  dense: PropTypes.bool,
  /**
   * If set, the toolbar group will not wrap.
   */
  nowrap: PropTypes.bool,
};

export const ToolbarGroupWithContext = withProviderContext(ToolbarGroup, 'ToolbarGroup');

export default ToolbarGroupWithContext;
