import PropTypes from 'prop-types';
import React from 'react';
import styles from './Toolbar.scss';

export const ToolbarItem = (props) => {
  const {
    children,
  } = props;

  return (
    <div className={styles.item}>
      {children}
    </div>
  );
};

ToolbarItem.propTypes = {
  /**
   * Content of the toolbar item.
   */
  children: PropTypes.node.isRequired,
};

export default ToolbarItem;
