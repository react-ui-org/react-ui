import React from 'react';
import { withGlobalProps } from '../../providers/globalProps';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getAlignClassName } from './_helpers/getAlignClassName';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import { ToolbarProps } from './Toolbar.types';
import styles from './Toolbar.module.scss';

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  align = 'top',
  children,
  dense = false,
  justify = 'start',
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

export const ToolbarWithGlobalProps = withGlobalProps(Toolbar, 'Toolbar');

export default ToolbarWithGlobalProps;
