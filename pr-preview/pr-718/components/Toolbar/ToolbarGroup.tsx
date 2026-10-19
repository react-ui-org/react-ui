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
        getAlignClassName(styles, 'group', align),
      )}
    >
      {children}
    </div>
  );
};

export const ToolbarGroupWithGlobalProps = withGlobalProps<ToolbarGroupProps, never>(ToolbarGroup, 'ToolbarGroup');

export default ToolbarGroupWithGlobalProps;
