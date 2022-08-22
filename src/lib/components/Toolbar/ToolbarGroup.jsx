import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Toolbar.scss';

export const ToolbarGroup = ({
  align,
  children,
  dense,
  nowrap,
  ...restProps
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

  return (
    <div
      {...transferProps(restProps)}
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
  children: null,
  dense: false,
  nowrap: false,
};

ToolbarGroup.propTypes = {
  /**
   * Vertical alignment of toolbar items in the group.
   */
  align: PropTypes.oneOf(['top', 'middle', 'bottom', 'baseline']),
  /**
   * Grouped ToolbarItems. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * If `true`, spacing of toolbar items in the group will be reduced.
   */
  dense: PropTypes.bool,
  /**
   * If set, the toolbar group will not wrap.
   */
  nowrap: PropTypes.bool,
};

export const ToolbarGroupWithGlobalProps = withGlobalProps(ToolbarGroup, 'ToolbarGroup');

export default ToolbarGroupWithGlobalProps;
