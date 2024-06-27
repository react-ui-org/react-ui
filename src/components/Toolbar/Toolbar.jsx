import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../provider';
import { classNames } from '../../utils/classNames';
import { transferProps } from '../../utils/transferProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getAlignClassName } from './_helpers/getAlignClassName';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './Toolbar.module.scss';

export const Toolbar = ({
  align,
  children,
  dense,
  justify,
  nowrap,
  ...restProps
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.toolbar,
        dense && styles.isToolbarDense,
        nowrap && styles.isToolbarNowrap,
        getAlignClassName(align, styles, 'toolbar'),
        getJustifyClassName(justify, styles),
      )}
    >
      {children}
    </div>
  );
};

Toolbar.defaultProps = {
  align: 'top',
  children: null,
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
