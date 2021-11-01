import PropTypes from 'prop-types';
import React from 'react';
import { withProviderContext } from '../../provider';
import styles from './List.scss';

export const ListItem = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <li className={styles.item}>
      {children}
    </li>
  );
};

ListItem.defaultProps = {
  children: null,
};

ListItem.propTypes = {
  /**
   * Content of the list item.
   */
  children: PropTypes.node,
};

export const ListItemWithContext = withProviderContext(ListItem, 'ListItem');

export default ListItemWithContext;
