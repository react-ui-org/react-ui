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
        getAlignClassName(styles, 'toolbar', align),
        getJustifyClassName(styles, justify),
      )}
    >
      {children}
    </div>
  );
};

export const ToolbarWithGlobalProps = withGlobalProps<ToolbarProps, never>(Toolbar, 'Toolbar');

export default ToolbarWithGlobalProps;
