import React from 'react';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { withGlobalProps } from '../../providers/globalProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import styles from './Toolbar.module.scss';
import type { ToolbarItemProps } from './Toolbar.types';

export const ToolbarItem: React.FunctionComponent<ToolbarItemProps> = ({
  children,
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

export const ToolbarItemWithGlobalProps = withGlobalProps<ToolbarItemProps, never>(ToolbarItem, 'ToolbarItem');

export default ToolbarItemWithGlobalProps;
