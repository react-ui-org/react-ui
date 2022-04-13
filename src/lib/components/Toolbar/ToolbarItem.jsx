import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../../utils/classNames';
import { withProviderContext } from '../../provider';
import styles from './Toolbar.scss';

export const ToolbarItem = (props) => {
  const {
    children,
    flexible,
  } = props;

  return (
    <div
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
  flexible: false,
};

ToolbarItem.propTypes = {
  /**
   * Content of the toolbar item.
   */
  children: PropTypes.node.isRequired,
  /**
   * Allow item to grow and shrink if needed.
   */
  flexible: PropTypes.bool,
};

export const ToolbarItemWithContext = withProviderContext(ToolbarItem, 'ToolbarItem');

export default ToolbarItemWithContext;
