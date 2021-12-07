import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import { classNames } from '../../utils/classNames';
import styles from './Toolbar.scss';

export const Toolbar = (props) => {
  const {
    align,
    children,
    dense,
    justify,
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

  const justifyClass = (value) => {
    if (value === 'start') {
      return styles.isJustifiedToStart;
    }

    if (value === 'center') {
      return styles.isJustifiedToCenter;
    }

    if (value === 'end') {
      return styles.isJustifiedToEnd;
    }

    return styles.isJustifiedToSpaceBetween;
  };

  return (
    <div
      className={classNames(
        styles.toolbar,
        dense && styles.isDense,
        nowrap && styles.isNowrap,
        alignClass(align),
        justifyClass(justify),
      )}
    >
      {children}
    </div>
  );
};

Toolbar.defaultProps = {
  align: 'top',
  dense: false,
  justify: 'start',
  nowrap: false,
};

Toolbar.propTypes = {
  /**
   * Vertical alignment of toolbar items and groups.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  /**
   * Individual ToolbarItems and ToolbarGroups.
   */
  children: PropTypes.node.isRequired,
  /**
   * If `true`, spacing of all toolbar items in the toolbar will be reduced.
   */
  dense: PropTypes.bool,
  /**
   * Horizontal alignment (distribution) of toolbar items and groups.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between']),
  /**
   * If set, the toolbar will not wrap.
   */
  nowrap: PropTypes.bool,
};

export const ToolbarWithContext = withProviderContext(Toolbar, 'Toolbar');

export default ToolbarWithContext;
