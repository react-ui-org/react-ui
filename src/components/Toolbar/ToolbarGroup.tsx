import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getAlignClassName } from './_helpers/getAlignClassName';
import { ToolbarGroupProps } from './ToolbarGroup.types';
import styles from './Toolbar.module.scss';

export const ToolbarGroup: React.FunctionComponent<ToolbarGroupProps> = ({
  align = 'top',
  children,
  dense = false,
  nowrap = false,
  ...restProps
}) => {
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

export const ToolbarGroupWithGlobalProps = withGlobalProps(ToolbarGroup, 'ToolbarGroup');

export default ToolbarGroupWithGlobalProps;
