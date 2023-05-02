import React from 'react';
import { withGlobalProps } from '../../provider';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import { getAlignClassName } from './_helpers/getAlignClassName';
import { getJustifyClassName } from './_helpers/getJustifyClassName';
import styles from './Toolbar.scss';
import { ToolbarProps } from './Toolbar.types';

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  align = 'top',
  children = null,
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
