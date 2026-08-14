import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../../helpers/classNames/classNames';
import { transferProps } from '../../helpers/transferProps';
import { withGlobalProps } from '../../providers/globalProps';
import { isChildrenEmpty } from '../../helpers/isChildrenEmpty/isChildrenEmpty';
import styles from './Toolbar.module.scss';

export const ToolbarItem = ({
  children,
  flexible,
  ...restProps
}) => {
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

ToolbarItem.defaultProps = {
  children: undefined,
  flexible: false,
};

ToolbarItem.propTypes = {
  /**
   * Content of the toolbar item. If none are provided nothing is rendered.
   */
  children: PropTypes.node,
  /**
   * Allow item to grow and shrink if needed.
   */
  flexible: PropTypes.bool,
};

export const ToolbarItemWithGlobalProps = withGlobalProps(ToolbarItem, 'ToolbarItem');

export default ToolbarItemWithGlobalProps;
