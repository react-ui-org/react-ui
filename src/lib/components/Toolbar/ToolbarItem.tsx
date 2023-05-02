import React from 'react';
import { transferProps } from '../_helpers/transferProps';
import { classNames } from '../../utils/classNames';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Toolbar.scss';
import { ToolbarItemProps } from './Toolbar.types';

export const ToolbarItem: React.FC<ToolbarItemProps> = ({
  children = null,
  flexible = false,
  ...restProps
}: ToolbarItemProps) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      {...transferProps(restProps)}
      className={classNames(
        styles.item,
        flexible && styles.isItemFlexible,
      )}
    >
      {children}
    </div>
  );
};

export const ToolbarItemWithGlobalProps = withGlobalProps(ToolbarItem, 'ToolbarItem');

export default ToolbarItemWithGlobalProps;
