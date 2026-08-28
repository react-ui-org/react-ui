import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { getAlignClassName } from './_helpers/getAlignClassName';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './Toolbar.module.scss';
import type { ToolbarProps } from './Toolbar.types';

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  align = 'top',
  children,
  dense = false,
  justify = 'start',
  nowrap = false,
  ...restProps
}: ToolbarProps) => {
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

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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

export const ToolbarWithGlobalProps = withGlobalProps<ToolbarProps, never>(Toolbar, 'Toolbar');

export default ToolbarWithGlobalProps;
