import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../../utils/classNames';
import { withGlobalProps } from '../../provider';
import { isChildrenEmpty } from '../_helpers/isChildrenEmpty';
import styles from './Toolbar.scss';

export const ToolbarItem = ({
  children,
  flexible,
  id,
}) => {
  if (isChildrenEmpty(children)) {
    return null;
  }

  return (
    <div
      className={classNames(
        styles.item,
        flexible && styles.isItemFlexible,
      )}
      id={id}
    >
      {children}
    </div>
  );
};

ToolbarItem.defaultProps = {
  children: null,
  flexible: false,
  id: undefined,
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
  /**
   * ID of the root HTML element.
   */
  id: PropTypes.string,
};

export const ToolbarItemWithGlobalProps = withGlobalProps(ToolbarItem, 'ToolbarItem');

export default ToolbarItemWithGlobalProps;
