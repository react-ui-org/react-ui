import PropTypes from 'prop-types';
import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import { getAlignClassName } from './_helpers/getAlignClassName';
import styles from './Toolbar.module.scss';
import type { ToolbarGroupProps } from './Toolbar.types';

export const ToolbarGroup: React.FunctionComponent<ToolbarGroupProps> = ({
  align = 'top',
  children,
  dense = false,
  nowrap = false,
  ...restProps
}: ToolbarGroupProps) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.group,
        dense && styles.isGroupDense,
        nowrap && styles.isGroupNowrap,
        getAlignClassName(align, styles, 'group'),
      )}
    >
      {children}
    </div>
  );
};

// `propTypes` are kept for runtime validation until the TypeScript migration is complete.
// eslint-disable-next-line @typescript-eslint/no-deprecated
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

export const ToolbarGroupWithGlobalProps = withGlobalProps<ToolbarGroupProps, never>(ToolbarGroup, 'ToolbarGroup');

export default ToolbarGroupWithGlobalProps;
