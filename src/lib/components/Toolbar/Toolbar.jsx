import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Toolbar.scss';

export const Toolbar = ({
  align,
  children,
  dense,
  id,
  justify,
  nowrap,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

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
      id={id}
    >
      {children}
    </div>
  );
};

Toolbar.defaultProps = {
  align: 'top',
  children: null,
  dense: false,
  id: undefined,
  justify: 'start',
  nowrap: false,
};

Toolbar.propTypes = {
  /**
   * Vertical alignment of toolbar items and groups.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  /**
   * Nested elements. Supported types are:
   * * `ToolbarItems`
   * * `ToolbarGroups`
   *
   * If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * If `true`, spacing of all toolbar items in the toolbar will be reduced.
   */
  dense: PropTypes.bool,
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
  /**
   * Horizontal alignment (distribution) of toolbar items and groups.
   */
  justify: PropTypes.oneOf(['start', 'center', 'end', 'space-between']),
  /**
   * If set, the toolbar will not wrap.
   */
  nowrap: PropTypes.bool,
};

export const ToolbarWithGlobalProps = withGlobalProps(Toolbar, 'Toolbar');

export default ToolbarWithGlobalProps;
